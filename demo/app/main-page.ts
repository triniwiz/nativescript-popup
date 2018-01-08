import * as observable from 'tns-core-modules/data/observable';
import * as pages from 'tns-core-modules/ui/page';
import { HelloWorldModel } from './main-view-model';
import { Label } from 'tns-core-modules/ui/label';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { ScrollView } from 'tns-core-modules/ui/scroll-view';
import { ListView, ItemEventData } from 'tns-core-modules/ui/list-view';
import { Button } from 'tns-core-modules/ui/button';
import * as builder from 'tns-core-modules/ui/builder';
import { fromObject } from 'tns-core-modules/data/observable';
import * as fs from 'tns-core-modules/file-system';
let page;
let vm = new HelloWorldModel();
export function pageLoaded(args: observable.EventData) {
  // Get the event sender
  page = <pages.Page>args.object;
  page.bindingContext = vm;
}

export function showPopup() {
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
    page.bindingContext.hidePopup();
  });
  stack.addChild(dismissBtn);
  const sv = new ScrollView();
  sv.content = stack;
  page.bindingContext.showPopup(page.getViewById('btn'), sv);
}

export function showPopupList() {
  const listPath = fs.path.join(fs.knownFolders.currentApp().path, '/template/list.xml');
  const component = builder.load(listPath);
  component.bindingContext = vm;
  page.bindingContext.showPopup(page.getViewById('btnList'), component);
}

export function showTemplatePopup(args) {
  page.bindingContext.showPopup(page.getViewById('btn'), '~/template/bomb.xml');
}
