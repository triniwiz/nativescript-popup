import { Component, OnInit } from '@angular/core';

import { Item } from './item';
import { ItemService } from './item.service';
import { Page } from 'tns-core-modules/ui/page';
import * as fs from 'tns-core-modules/file-system';
import { ItemEventData } from 'tns-core-modules/ui/list-view';
import { Popup } from 'nativescript-popup';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { Button } from 'tns-core-modules/ui/button';
import { Label } from 'tns-core-modules/ui/label';
import { ScrollView } from 'tns-core-modules/ui/scroll-view';
import * as builder from 'tns-core-modules/ui/builder';
@Component({
  selector: 'ns-items',
  moduleId: __filename,
  templateUrl: './items.component.html'
})
export class ItemsComponent implements OnInit {
  private popup: Popup;
  items = [
    { name: 'Osei' },
    { name: 'Sean' },
    { name: 'Brad' },
    { name: 'Some' },
    { name: 'More' },
    { name: 'Names' },
    { name: 'To' },
    { name: 'Make' },
    { name: 'This' },
    { name: 'List' },
    { name: 'Scroll' }
  ];

  itemTap(args: ItemEventData) {
    this.hidePopup(`${this.items[args.index]['name']} : ${args.index}`);
  }

  _showPopup(source, view) {
    this.popup = new Popup({
      height: 30,
      width: 80,
      unit: '%',
      elevation: 10,
      borderRadius: 25
    });
    this.popup.showPopup(source, view).then(data => {
      console.log(data);
    });
  }
  hidePopup(index?) {
    this.popup.hidePopup(index);
  }

  constructor(private page: Page) {}
  ngOnInit() {}

  showPopup() {
    const stack: any = new StackLayout();
    stack.height = '100%';
    const lbl: any = new Label();
    lbl.text = 'Osei';
    lbl.backgroundColor = 'red';
    lbl.marginTop = 5;
    lbl.height = 40;
    stack.addChild(lbl);
    const lblOther: any = new Label();
    lblOther.text = 'Fortune';
    lblOther.backgroundColor = 'blue';
    lblOther.height = 40;
    stack.addChild(lblOther);
    const btn: any = new Button();
    btn.text = 'Push';
    btn.height = 40;
    stack.addChild(btn);
    const dismissBtn = new Button();
    dismissBtn.text = 'Hide';
    dismissBtn.on('tap', args => {
      this.hidePopup();
    });
    stack.addChild(dismissBtn);
    const sv = new ScrollView();
    sv.content = stack;
    this._showPopup(this.page.getViewById('btn'), this);
  }

  showPopupList() {
    const listPath = fs.path.join(
      fs.knownFolders.currentApp().path,
      '/template/list.html'
    );
    const component = builder.load(listPath);
    component.bindingContext = this;
    this._showPopup(this.page.getViewById('btnList'), component);
  }

  showTemplatePopup(args) {
    this._showPopup(this.page.getViewById('btn'), '~/template/bomb.html');
  }
}
