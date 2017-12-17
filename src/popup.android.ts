import { Common, PopupOptions } from './popup.common';
import { View } from 'tns-core-modules/ui/core/view';
import * as utils from 'tns-core-modules/utils/utils';
import * as frame from 'tns-core-modules/ui/frame';
import { Color } from 'tns-core-modules/color';
import { screen, device } from 'tns-core-modules/platform';
export class Popup extends Common {
  private _popup: android.widget.PopupWindow;
  private _options: PopupOptions;
  resolve;
  reject;
  private _view;
  constructor(options?: PopupOptions) {
    super();
    this._options = new PopupOptions();
    this._popup = new android.widget.PopupWindow(
      utils.ad.getApplicationContext()
    );
    if (options) {
      Object.keys(options).forEach(key => {
        this._options[key] = options[key];
      });
    }
  }

  public showPopup(source: any, view: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._popup.setOutsideTouchable(true);
      this.reject = reject;
      this.resolve = resolve;
      if (view instanceof android.view.View) {
        this._popup.setContentView(view);
      } else if (view instanceof View) {
        frame.topmost()._addView(view);
        let height;
        let width;
        switch (this._options.unit) {
          case 'px':
            if (this._options.height && !this._options.width) {
              height = this._options.height;
              width =
                this._options.height *
                (screen.mainScreen.widthPixels /
                  screen.mainScreen.heightPixels);
            } else if (this._options.width && !this._options.height) {
              height =
                this._options.width *
                (screen.mainScreen.widthPixels /
                  screen.mainScreen.heightPixels);
              width = this._options.width;
            } else {
              width = this._options.width;
              height = this._options.height;
            }
            break;
          case '%':
            if (this._options.height && !this._options.width) {
              height =
                screen.mainScreen.heightDIPs * (this._options.height / 100);
              width =
                height *
                (screen.mainScreen.widthPixels /
                  screen.mainScreen.heightPixels);
            } else if (this._options.width && !this._options.height) {
              width = screen.mainScreen.widthDIPs * (this._options.width / 100);
              height =
                width *
                (screen.mainScreen.widthPixels /
                  screen.mainScreen.heightPixels);
            } else {
              width = screen.mainScreen.widthDIPs * (this._options.width / 100);
              height =
                screen.mainScreen.heightDIPs * (this._options.height / 100);
            }
            break;
          default:
            if (this._options.height && !this._options.width) {
              height = this._options.height;
              width =
                this._options.height *
                (screen.mainScreen.widthPixels /
                  screen.mainScreen.heightPixels);
            } else if (this._options.width && !this._options.height) {
              height =
                this._options.width *
                (screen.mainScreen.widthPixels /
                  screen.mainScreen.heightPixels);
              width = this._options.width;
            } else {
              width = this._options.width ? this._options.width : 400;
              height = this._options.height ? this._options.height : 320;
            }
            break;
        }

        const shape = new android.graphics.drawable.GradientDrawable();
        shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);

        if (this._options && this._options.borderRadius) {
          shape.setCornerRadius(this._options.borderRadius);
        }
        if (this._options && this._options.backgroundColor) {
          shape.setColor(
            new Color(this._options.backgroundColor).android
          );
        }
        (this._popup as any).setBackgroundDrawable(shape);
        if (parseInt(device.sdkVersion, 10) >= 21) {
          if (this._options.elevation) {
            (this._popup as any).setElevation(this._options.elevation);
          }
        }
        this._popup.setWidth(utils.layout.toDevicePixels(width));
        this._popup.setHeight(utils.layout.toDevicePixels(height));

        this._view = view;
        this._popup.setContentView(view.android);
      }
      if (source instanceof android.view.View) {
        this._popup.showAsDropDown(source);
      } else if (source instanceof View) {
        this._popup.showAsDropDown(source.android);
      }
    });
  }
  public hidePopup(data?: any) {
    if (this.resolve) {
      this.resolve(data);
    }
    this._popup.dismiss();
    if (this._view) {
      frame.topmost()._removeView(this._view);
    }
  }
}
