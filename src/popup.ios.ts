import * as builder from 'tns-core-modules/ui/builder';
import * as fs from 'tns-core-modules/file-system';
import { Common, PopupOptions } from './popup.common';
import { View } from 'tns-core-modules/ui/core/view';
import { topmost } from 'tns-core-modules/ui/frame';
import { ios } from 'tns-core-modules/ui/utils';
import { device, screen } from 'tns-core-modules/platform';
import { layout } from 'tns-core-modules/utils/utils';
import { Color } from 'tns-core-modules/color';

export class Popup extends Common {
    private _popupController: UIViewController;
    private _options: PopupOptions;
    private resolveData;
    resolve;
    reject;

    constructor(options?: PopupOptions) {
        super();
        this._options = new PopupOptions();
        if (options) {
            Object.keys(options).forEach(key => {
                this._options[key] = options[key];
            });
        }

        this._popupController = UIViewController.new();
        this._popupController.modalPresentationStyle =
            UIModalPresentationStyle.Popover;
    }

    public showPopup(source: any, view: any): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.reject = reject;
            this.resolve = resolve;
            const isTablet = device.deviceType === 'Tablet';
            let nativeView;
            if (!this._popupController.popoverPresentationController.delegate) {
                this._popupController.popoverPresentationController.delegate = UIPopoverPresentationControllerDelegateImpl.initWithOwner(
                    new WeakRef(this)
                );
            }
            if (this._options.backgroundColor) {
                this._popupController.view.backgroundColor = new Color(
                    this._options.backgroundColor
                ).ios;
            }
            if (this._options.hideArrow) {
                this._popupController.popoverPresentationController.permittedArrowDirections = 0;
            }
            // check the view argument
            if (view instanceof View) {
                topmost()._addView(view);
                this._stylePopup(view, isTablet);
                this._popupController.preferredContentSize =
                    view.nativeView.bounds.size;
                nativeView = view.nativeView;
            } else if (view instanceof UIView) {
                nativeView = view;
            } else if (typeof view === 'string' || view instanceof String) {
                // this is a template so use the builder to load the template
                let path;
                let component: View;
                if (view.startsWith('~')) {
                    view = view.replace('~', '');
                    path = fs.knownFolders.currentApp().path;
                    component = builder.load(fs.path.join(path, view)) as View;
                } else {
                    component = builder.load(<any>view) as View;
                }
                topmost()._addView(component);
                this._stylePopup(component, isTablet);
                this._popupController.preferredContentSize =
                    component.nativeView.bounds.size;
                nativeView = component.ios;
            }

            // check the source argument
            if (source instanceof View) {
                this._popupController.popoverPresentationController.sourceView =
                    source.nativeView;
                this._popupController.popoverPresentationController.sourceRect = CGRectMake(
                    0,
                    0,
                    source.nativeView.frame.size.width,
                    source.nativeView.frame.size.height
                );
                this._popupController.view.addSubview(nativeView);
                (<UINavigationController>topmost().ios
                    .controller).presentModalViewControllerAnimated(
                    this._popupController,
                    true
                );
            } else if (source instanceof UIView) {
                this._popupController.popoverPresentationController.sourceView = source;
                this._popupController.popoverPresentationController.sourceRect = CGRectMake(
                    0,
                    0,
                    source.frame.size.width,
                    source.frame.size.height
                );
                this._popupController.view.addSubview(nativeView);
                (<UINavigationController>topmost().ios
                    .controller).presentModalViewControllerAnimated(
                    this._popupController,
                    true
                );
            }
        });
    }

    didDismiss = () => {
        if (this.resolve) {
            this.resolve(this.resolveData);
        }
        this.resolve = null;
        this.reject = null;
    }

    getOptions = () => {
        return this._options;
    }

    public hidePopup(data?: any) {
        this.resolveData = data;
        this._popupController.dismissModalViewControllerAnimated(true);
    }

    private _stylePopup(view, isTablet) {
        let height;
        let width;
        switch (this._options.unit) {
            case 'px':
                if (this._options.height && !this._options.width) {
                    height = this._options.height;
                    width =
                        this._options.height *
                        (screen.mainScreen.widthPixels / screen.mainScreen.heightPixels);
                } else if (this._options.width && !this._options.height) {
                    height =
                        this._options.width *
                        (screen.mainScreen.widthPixels / screen.mainScreen.heightPixels);
                    width = this._options.width;
                } else {
                    width = this._options.width;
                    height = this._options.height;
                }

                ios._layoutRootView(
                    view,
                    CGRectMake(
                        0,
                        0, // isTablet ? 0 : ios.getStatusBarHeight(),
                        layout.toDeviceIndependentPixels(width),
                        layout.toDeviceIndependentPixels(height)
                    )
                );
                break;
            case '%':
                if (this._options.height && !this._options.width) {
                    height = screen.mainScreen.heightDIPs * (this._options.height / 100);
                    width =
                        height *
                        (screen.mainScreen.widthPixels / screen.mainScreen.heightPixels);
                } else if (this._options.width && !this._options.height) {
                    width = screen.mainScreen.widthDIPs * (this._options.width / 100);
                    height =
                        width *
                        (screen.mainScreen.widthPixels / screen.mainScreen.heightPixels);
                } else {
                    width = screen.mainScreen.widthDIPs * (this._options.width / 100);
                    height = screen.mainScreen.heightDIPs * (this._options.height / 100);
                }
                ios._layoutRootView(view, CGRectMake(0, 0, width, height));
                break;
            default:
                if (this._options.height && !this._options.width) {
                    height = this._options.height;
                    width =
                        this._options.height *
                        (screen.mainScreen.widthPixels / screen.mainScreen.heightPixels);
                } else if (this._options.width && !this._options.height) {
                    height =
                        this._options.width *
                        (screen.mainScreen.widthPixels / screen.mainScreen.heightPixels);
                    width = this._options.width;
                } else {
                    width = this._options.width
                        ? this._options.width
                        : isTablet ? 400 : 300;
                    height = this._options.height
                        ? this._options.height
                        : isTablet ? 320 : 100;
                }
                ios._layoutRootView(view, CGRectMake(0, 0, width, height));
                break;
        }
    }
}

export class UIPopoverPresentationControllerDelegateImpl extends NSObject
    implements UIPopoverPresentationControllerDelegate {
    static ObjCProtocols = [UIPopoverPresentationControllerDelegate];
    private _owner: WeakRef<Popup>;

    static initWithOwner(owner: WeakRef<Popup>) {
        const delegate = new UIPopoverPresentationControllerDelegateImpl();
        delegate._owner = owner;
        return delegate;
    }

    adaptivePresentationStyleForPresentationController?(
        controller: UIPresentationController
    ): UIModalPresentationStyle {
        return UIModalPresentationStyle.None;
    }

    popoverPresentationControllerDidDismissPopover(
        popoverPresentationController: UIPopoverPresentationController
    ): void {
        if (this._owner.get()) {
            this._owner.get().didDismiss();
        }
    }

    popoverPresentationControllerShouldDismissPopover(
        popoverPresentationController: UIPopoverPresentationController
    ): any {
        if (this._owner.get()) {
            return this._owner.get().getOptions().outsideTouchble;
        }
    }
}
