import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '@mebli/auth';
import { NgOverlayContainerService, NgPopoverCloseEvent, NgPopoverRef } from 'ng-overlay-container';
import { user } from 'rxfire/auth';

@Component({
    selector: 'mebli-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
    @ViewChild('changeAccountNameTemplate') private changeAccountNameTemplate!: TemplateRef<any>;
    @ViewChild('changeEmailTemplate') private changeEmailTemplate!: TemplateRef<any>;
    @ViewChild('changePasswordTemplate') private changePasswordTemplate!: TemplateRef<any>;
    @ViewChild('changePasswordTemplateGmail') private changePasswordTemplateGmail!: TemplateRef<any>;
    @ViewChild('deleteAccountTemplate') private deleteAccountTemplate!: TemplateRef<any>;
    @ViewChild('deleteAccountTemplateGmail') private deleteAccountTemplateGmail!: TemplateRef<any>;

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

    public onChangeEmail(): void {
        const ngPopoverRef = this.openPopup<void, { newEmail: string, confPassword: string }>(this.changeEmailTemplate);
        ngPopoverRef.afterClosed$.subscribe((result: NgPopoverCloseEvent<{ newEmail: string, confPassword: string }>) => {
            if (result.data.newEmail&&result.data.confPassword) {
                this.authService.changeEmail(result.data.confPassword, result.data.newEmail);
            }
        });
    }

    public async onChangePassword(): Promise<void> {

        if (await this.authService.isgmail()){
            this.openPopup<void, { any: any }>(this.changePasswordTemplateGmail);
        }
        else {
            const ngPopoverRef = this.openPopup<void, { newPassword: string, oldPasswort: string }>(this.changePasswordTemplate);
            ngPopoverRef.afterClosed$.subscribe((result: NgPopoverCloseEvent<{ newPassword: string , oldPasswort: string}>) => {
                if (result.data.newPassword && result.data.oldPasswort) {
                    this.authService.changePassword(result.data.newPassword, result.data.oldPasswort);
                }
            })
        };
    }

    public async onLoginWithGoogleForDelete(): Promise<void> {
        await this.authService.deleteProfile("gmail");
    }

    public async onChangeDeleteAccount(): Promise<void> {
        if (await this.authService.isgmail()){
            const ngPopoverRef = this.openPopup<void, { confPassword: string }>(this.deleteAccountTemplateGmail);
            ngPopoverRef.afterClosed$.subscribe((result: NgPopoverCloseEvent<{ confPassword: string }>) => {
                if (result.data.confPassword != null ) {
                    this.authService.deleteProfile(result.data.confPassword);
                }
            });
        }
        else {
            const ngPopoverRef = this.openPopup<void, { confPassword: string }>(this.deleteAccountTemplate);
            ngPopoverRef.afterClosed$.subscribe((result: NgPopoverCloseEvent<{ confPassword: string }>) => {
                if (result.data.confPassword != null ) {
                    this.authService.deleteProfile(result.data.confPassword);
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

