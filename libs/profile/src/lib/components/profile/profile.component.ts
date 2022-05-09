import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
        private readonly ngOverlayContainerService: NgOverlayContainerService,
        private readonly router: Router
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
            this.openPopup<void, void>(this.changePasswordTemplateGmail);
        } else {
            const ngPopoverRef = this.openPopup<
                void,
                { oldPassword: string; newPassword: string; newPasswordConfirm: string }
            >(this.changePasswordTemplate);
            ngPopoverRef.afterClosed$.subscribe(
                (
                    result: NgPopoverCloseEvent<{
                        oldPassword: string;
                        newPassword: string;
                        newPasswordConfirm: string;
                    }>
                ) => {
                    if (
                        result.data.newPassword &&
                        result.data.oldPassword &&
                        result.data.newPasswordConfirm &&
                        result.data.newPassword === result.data.newPasswordConfirm
                    ) {
                        this.authService.changePassword(result.data.newPassword, result.data.oldPassword);
                    }
                }
            );
        }
    }

    public async onDeleteAccount(): Promise<void> {
        if (await this.authService.isGmail()) {
            const ngPopoverRef = this.openPopup<void, { action: string }>(this.deleteAccountTemplateGmail);
            ngPopoverRef.afterClosed$.subscribe((result: NgPopoverCloseEvent<{ action: string }>) => {
                if (result.data.action === 'delete') {
                    this.authService.deleteProfileGmail();
                }
            });
        } else {
            this.wrongPassword = false;
            this.tooManyRequests = false;

            const ngPopoverRef = this.openPopup<void, { confPassword: string }>(this.deleteAccountTemplate);
            ngPopoverRef.afterClosed$.subscribe(async (result: NgPopoverCloseEvent<{ confPassword: string }>) => {
                if (result.data.confPassword !== null && result.data.confPassword !== '') {
                    const deleteResult:
                        | 'invalidPassword'
                        | 'success'
                        | 'unknown_error'
                        | 'no_login'
                        | 'tooManyRequests' = await this.authService.deleteProfile(result.data.confPassword);

                    switch (deleteResult) {
                        case 'invalidPassword':
                            this.wrongPassword = true;
                            break;
                        case 'tooManyRequests':
                            this.tooManyRequests = true;
                            break;
                        case 'unknown_error':
                        case 'no_login':
                            console.error(deleteResult);
                            break;
                        case 'success':
                            this.router.navigate(['/login']);
                            break;
                        default:
                            console.log('Unhandled deleteResult', deleteResult);
                            break;
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
