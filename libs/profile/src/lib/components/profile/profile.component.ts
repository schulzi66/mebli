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

    public onChangePassword(): void {
        const ngPopoverRef = this.openPopup<void, { newPassword: string }>(this.changePasswordTemplate);
        ngPopoverRef.afterClosed$.subscribe((result: NgPopoverCloseEvent<{ newPassword: string }>) => {
            if (result.data.newPassword) {
                this.authService.changePassword(result.data.newPassword);
            }
        });
    }

    private openPopup<T, R>(template: TemplateRef<any>): NgPopoverRef<T, R> {
        return this.ngOverlayContainerService.open<T, R>({
            content: template,
            configuration: {
                useGlobalPositionStrategy: true,
                width: '90vw',
                height: '25vh',
                isResizable: false,
                backdropClass: 'cdk-overlay-dark-backdrop',
            },
        });
    }
}
