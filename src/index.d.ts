import { Common } from './popup.common';
export declare class Popup extends Common {
    private _popupController;
    private _options;
    resolve: any;
    reject: any;
    constructor(options?: PopupOptions);
    showPopup(source: any, view: any): Promise<boolean>;
    hidePopup(data?: any): void;
}
export declare class UIPopoverPresentationControllerDelegateImpl extends NSObject implements UIPopoverPresentationControllerDelegate {
    static ObjCProtocols: {
        prototype: UIPopoverPresentationControllerDelegate;
    }[];
    private _owner;
    static initWithOwner(owner: WeakRef<Popup>): UIPopoverPresentationControllerDelegateImpl;
    popoverPresentationControllerDidDismissPopover(popoverPresentationController: UIPopoverPresentationController): void;
}
export declare class PopupOptions {
    height?: any;
    width?: any;
    unit?: 'dp' | 'px' | '%';
    backgroundColor?: string;
    hideArrow?: boolean;
}
