import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '@mebli/auth';
import { NgOverlayContainerService, NgPopoverCloseEvent, NgPopoverRef } from 'ng-overlay-container';

@Component({
    selector: 'mebli-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
    @ViewChild('changeAccountNameTemplate') private changeAccountNameTemplate!: TemplateRef<any>;
    @ViewChild('changePasswordTemplate') private changePasswordTemplate!: TemplateRef<any>;
    @ViewChild('changePasswordTemplateGmail') private changePasswordTemplateGmail!: TemplateRef<any>;
    @ViewChild('deleteAccountTemplate') private deleteAccountTemplate!: TemplateRef<any>;
    @ViewChild('deleteAccountTemplateGmail') private deleteAccountTemplateGmail!: TemplateRef<any>;
    public wrongPassword = false;
    public tooManyRequests = false;

    public constructor(
        public readonly authService: AuthService,
        private readonly ngOverlayContainerService: NgOverlayContainerService
    ) {}

    public onChangeAccountName(): void {
        const ngPopoverRef = this.openPopup<void, { newName: string }>(this.changeAccountNameTemplate);
        ngPopoverRef.afterClosed$.subscribe((result: NgPopoverCloseEvent<{ newName: string }>) => {
            if (result.data.newName) {
                this.authService.changeAccountName(result.data.newName);
            }
        });
    }

    public async onChangePassword(): Promise<void> {
        if (await this.authService.isGmail()) {
            this.openPopup<void, { any: any }>(this.changePasswordTemplateGmail);
        } else {
            const ngPopoverRef = this.openPopup<void, { newPassword: string; oldPassword: string }>(
                this.changePasswordTemplate
            );
            ngPopoverRef.afterClosed$.subscribe(
                (result: NgPopoverCloseEvent<{ newPassword: string; oldPassword: string }>) => {
                    if (result.data.newPassword && result.data.oldPassword) {
                        this.authService.changePassword(result.data.newPassword, result.data.oldPassword);
                    }
                }
            );
        }
    }

    public async onDeleteAccount(): Promise<void> {
         
        if (await this.authService.isGmail()) {
            const ngPopoverRef = this.openPopup< void, { action: string } >(this.deleteAccountTemplateGmail);
            ngPopoverRef.afterClosed$.subscribe((result: NgPopoverCloseEvent<{ action: string }>) => {
                if (result.data.action == 'delete' ){
                    this.authService.deleteProfileGmail();
                }
            });
        } else {
            this.wrongPassword = false;
            this.tooManyRequests = false;

            const ngPopoverRef = this.openPopup<void, { confPassword: string }>(this.deleteAccountTemplate);
            ngPopoverRef.afterClosed$.subscribe(async (result: NgPopoverCloseEvent<{ confPassword: string }>) => {
                if (result.data.confPassword !== null && result.data.confPassword !=='') {
                    const deleteResult=  await  this.authService.deleteProfile(result.data.confPassword);
                    console.log("Delete Result ist: "+deleteResult);
                    if ( deleteResult == 'invalidPassword') {
                        console.log("Setze wrongPassword auf true");
                        this.wrongPassword = true;
                    }
                    if ( deleteResult == 'tooManyRequests') {
                        console.log("Setze tooManyRequests auf true");
                        this.tooManyRequests = true;
                    }
                }
            });
        }
    }

    private openPopup<T, R>(template: TemplateRef<any>): NgPopoverRef<T, R> {
        return this.ngOverlayContainerService.open<T, R>({
            content: template,
            configuration: {
                useGlobalPositionStrategy: true,
                width: '90vw',
                height: '40vh',
                isResizable: false,
                backdropClass: 'cdk-overlay-dark-backdrop',
            },
        });
    }
}
function email(email: any) {
    throw new Error('Function not implemented.');
}
