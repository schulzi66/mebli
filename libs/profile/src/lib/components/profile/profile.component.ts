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
    public wrongPasswordPwc = false;
    public tooManyRequestsPwc = false;
    public number = false;
    public length = false;
    public upperCase = false;
    public lowerCase = false;
    public newPasswordConfirm = '';
    public passwordsMatch = true;
    public specialCase = false;
    public passwordInvalid = false;
    public passwordNotEmpty = false;
    public newPassword = '';
    public oldPassword = '';
    public accountName = '';
    public accountNamevalid = '';
    public accountNameExists = false;

    public constructor(
        public readonly authService: AuthService,
        private readonly ngOverlayContainerService: NgOverlayContainerService,
        private readonly router: Router
    ) {}

    public onChangeAccountName(): void {
        this.accountNameExists = false;
        const ngPopoverRef = this.openPopup<void, { newName: string }>(this.changeAccountNameTemplate);
        ngPopoverRef.afterClosed$.subscribe(async (result: NgPopoverCloseEvent<{ newName: string }>) => {
            if (result.data.newName) {
                const accountResult: 'account_exists' | 'unknown_error' | 'success' =
                    await this.authService.changeAccountName(result.data.newName);

                if (accountResult === 'account_exists') {
                    this.accountNameExists = true;
                    //return;
                }
            }
        });
    }

    public async onChangePassword(): Promise<void> {
        this.wrongPasswordPwc = false;
        this.tooManyRequestsPwc = false;
        if (await this.authService.isGmail()) {
            this.openPopupChangePasswort<void, void>(this.changePasswordTemplateGmail);
        } else {
            const ngPopoverRef = this.openPopupChangePasswort<
                void,
                { oldPassword: string; newPassword: string; newPasswordConfirm: string }
            >(this.changePasswordTemplate);
            ngPopoverRef.afterClosed$.subscribe(
                async (
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
                        const deleteResultPw:
                            | 'invalidPassword'
                            | 'no_login'
                            | 'unknown_error'
                            | 'tooManyRequests'
                            | 'success' = await this.authService.changePassword(
                            result.data.newPassword,
                            result.data.oldPassword
                        );

                        switch (deleteResultPw) {
                            case 'invalidPassword':
                                this.wrongPasswordPwc = true;
                                break;
                            case 'tooManyRequests':
                                this.tooManyRequestsPwc = true;
                                break;
                        }
                    } else {
                        if (result.data.newPassword !== result.data.newPasswordConfirm) {
                            this.passwordsMatch = false;
                        }
                    }
                }
            );
        }
    }

    public async onDeleteAccount(): Promise<void> {
        if (await this.authService.isGmail()) {
            const ngPopoverRef = this.openPopupDeleteProfile<void, { action: string }>(this.deleteAccountTemplateGmail);
            ngPopoverRef.afterClosed$.subscribe((result: NgPopoverCloseEvent<{ action: string }>) => {
                if (result.data.action === 'delete') {
                    this.authService.deleteProfileGmail();
                }
            });
        } else {
            this.wrongPassword = false;
            this.tooManyRequests = false;

            const ngPopoverRef = this.openPopupDeleteProfile<void, { confPassword: string }>(
                this.deleteAccountTemplate
            );

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
                height: 'auto',
                isResizable: false,
                backdropClass: 'cdk-overlay-dark-backdrop',
            },
        });
    }
    private openPopupChangePasswort<T, R>(template: TemplateRef<any>): NgPopoverRef<T, R> {
        return this.ngOverlayContainerService.open<T, R>({
            content: template,
            configuration: {
                useGlobalPositionStrategy: true,
                width: '90vw',
                height: 'auto',
                isResizable: false,
                backdropClass: 'cdk-overlay-dark-backdrop',
            },
        });
    }

    private openPopupDeleteProfile<T, R>(template: TemplateRef<any>): NgPopoverRef<T, R> {
        return this.ngOverlayContainerService.open<T, R>({
            content: template,
            configuration: {
                useGlobalPositionStrategy: true,
                width: '90vw',
                height: 'auto',
                isResizable: false,
                backdropClass: 'cdk-overlay-dark-backdrop',
            },
        });
    }

    public onKeyNewPw(): void {
        if (this.newPassword.length > 7) {
            this.length = true;
        } else this.length = false;

        if (this.newPassword.match('(?=.*[0-9])')) {
            this.number = true;
        } else this.number = false;

        if (this.newPassword.match('(?=.*[A-Z])')) {
            this.upperCase = true;
        } else this.upperCase = false;

        if (this.newPassword.match('(?=.*[a-z])')) {
            this.lowerCase = true;
        } else this.lowerCase = false;

        if (this.newPassword.match('(?=.*\\W)')) {
            this.specialCase = true;
        } else this.specialCase = false;

        if (this.newPassword === this.newPasswordConfirm) {
            this.passwordsMatch = true;
        } else this.passwordsMatch = false;

        if (this.oldPassword !== '') {
            this.passwordNotEmpty = true;
        } else this.passwordNotEmpty = false;
    }
    public onKeyOldPw(): void {
        if (this.oldPassword !== '') {
            this.passwordNotEmpty = true;
        } else this.passwordNotEmpty = false;
    }
}
