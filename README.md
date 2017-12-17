[![npm](https://img.shields.io/npm/v/nativescript-popup.svg)](https://www.npmjs.com/package/nativescript-popup)
[![npm](https://img.shields.io/npm/dt/nativescript-popup.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-popup)
[![Build Status](https://travis-ci.org//triniwiz/nativescript-popup.svg?branch=master)](https://travis-ci.org/triniwiz/nativescript-popup)

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
        unit:'dp' | 'px' | '%',
        elevation:10, // android only
        borderRadius:25 // android only
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
