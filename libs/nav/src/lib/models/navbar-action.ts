export interface NavbarAction {
    /**
     * Number 0 is the home button. Everything smaller 0 will be displayed to the left, everything bigger will be displayed on the right
     */
    order: number;
    icon: string;
    translationKey: string;
    action: () => any;
    validator?: () => boolean;
}
