export declare class Popup {
  constructor(options: PopupOptions);

  /**
   * Shows the popup anchored to the source with the view as the popup contents.
   * @param source [View] - The view component to anchor the popup to. This can be a NS View component (button, label, etc.) or a native Android/iOS view.
   * @param view [View | string] - The popup's contents. This can be a NS View layout constructed in code, a native Android/iOS layout, or a string path to a template file.
   */
  showPopup(source: any, view: any): Promise<any>;

  /**
   * Hides the popup and removes it from the view hierarchy.
   * @param data
   */
  hidePopup(data?: any): Promise<any>;
}

export interface PopupOptions {
  /**
   * The height of the popup in the specified unit.
   */
  height?: number;

  /**
   * The width of the popup in the specified unit.
   */
  width?: number;

  /**
   * The measurement unit for the height/width.
   */
  unit?: "dp" | "px" | "%";

  /**
   * The background color of the popup.
   */
  backgroundColor?: string;

  hideArrow?: boolean;
  /**
   * Android Only - sets the elevation of the popup.
   */
  elevation?: number;

  /**
   * Android Only - sets the border radius of the popup.
   */
  borderRadius?: number;

  outsideTouchble?: boolean;
}
