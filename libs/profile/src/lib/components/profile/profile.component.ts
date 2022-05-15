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
    public wrongPasswordpwc = false;
    public tooManyRequestspwc = false;
    public number = false;
    public length = false;
    public uppercase = false;
    public lowercase = false;
    public newPasswordConfirm = '';
    public passwordsMatch = true;
    public specialcase = false;
    public passwordInvalid = false;
    public passwordnotempty = false;
    public newpassword = '';
    public oldpassword = '';
    public accountName = '';
    public accountNamevalid = '';
    public accountNameExists = false;
    

    public constructor(
        public readonly authService: AuthService,
        private readonly ngOverlayContainerService: NgOverlayContainerService,
        private readonly router: Router
    ) {}

    public onChangeAccountName(): void {
        console.log('start der funktion')
        this.accountNameExists = false;
        const ngPopoverRef = this.openPopup<void, { newName: string }>(this.changeAccountNameTemplate);
        ngPopoverRef.afterClosed$.subscribe(async (result: NgPopoverCloseEvent<{ newName: string }>) => {
            if (result.data.newName) {
                const AccountResult:
                | 'account_exists'  
                | 'unknown_error'
                | 'success'
                    = 
                    await this.authService.changeAccountName(result.data.newName);
                switch (AccountResult) {
                   
                    case 'account_exists':
                        this.accountNameExists = true;
                        break;
                }

            }
        });
    }

    public async onChangePassword(): Promise<void> {
        this.wrongPasswordpwc = false;
        this.tooManyRequestspwc = false;
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
                        const deleteResultpw:
                        | 'invalidPassword'
                        | 'no_login'
                        | 'unknown_error' 
                        | 'tooManyRequests' 
                        | 'success'
                       = await this.authService.changePassword(result.data.newPassword, result.data.oldPassword);
                       switch (deleteResultpw) {
                            case 'invalidPassword':
                                this.wrongPasswordpwc = true;
                                break;
                            case 'tooManyRequests':
                                this.tooManyRequestspwc = true;
                                break;
                        }
                    }
                    else {
                        if (result.data.newPassword !== result.data.newPasswordConfirm)
                        {
                        this.passwordsMatch = false
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

            const ngPopoverRef = this.openPopupDeleteProfile<void, { confPassword: string }>(this.deleteAccountTemplate);
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
                height: '30vh',
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
                height: '60vh',
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
                height: '40vh',
                isResizable: false,
                backdropClass: 'cdk-overlay-dark-backdrop',
            },
        });
    }

    public onKeyNewPw(): void {
        if (this.newpassword.length > 7) {
            this.length = true;
        } else this.length = false;

        if (this.newpassword.match('(?=.*[0-9])')) {
            this.number = true;
        } else this.number = false;

        if (this.newpassword.match('(?=.*[A-Z])')) {
            this.uppercase = true;
        } else this.uppercase = false;

        if (this.newpassword.match('(?=.*[a-z])')) {
            this.lowercase = true;
        } else this.lowercase = false;

        if (this.newpassword.match('(?=.*\\W)')) {
            this.specialcase = true;
        } else this.specialcase = false;

        if (this.newpassword === this.newPasswordConfirm) {
            this.passwordsMatch = true;
        } else this.passwordsMatch = false;

        if (this.oldpassword !== '') {
            this.passwordnotempty = true;
        } else this.passwordnotempty = false;
    
    }
    public onKeyOldPw(): void {
        if (this.oldpassword !== '') {
            this.passwordnotempty = true;
        } else this.passwordnotempty = false;
    }

}
