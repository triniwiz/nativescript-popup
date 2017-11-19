# NativeScript Popup

## Installation

`tns plugin add nativescript-popup`

## Usage 
```xml
    <Button tap="openPopup"/>
```
	

```ts
    import { Popup } from 'nativescript-popup';

    function openPopup(args){
    const popup = new Popup({
        backgroundColor:'white' | '#fff',
        height:100,
        width:100,
        unit:'dp' | 'px' | '%'
    });
    const view = new Label();
    view.text = "Test";

    /* IOS */
    const nativeView = UILabel.new();
    nativeView.text = "Native Button";
    nativeView.frame = CGRectMake(0,0,50,50);
    /* IOS */

    /* Android */
    const nativeView = new new android.widget.TextView(context);
    nativeView.setText("Native Button");
    nativeView.setWidth(50);
    nativeView.setHeight(50);
    /* Android */

    popup.showPopup(anchor: View | nativeView , view: View | nativeView);
    }
```


## License

Apache License Version 2.0, January 2004
