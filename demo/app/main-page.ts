import * as observable from 'tns-core-modules/data/observable';
import * as pages from 'tns-core-modules/ui/page';
import { HelloWorldModel } from './main-view-model';
import { Label } from 'tns-core-modules/ui/label';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { ScrollView } from 'tns-core-modules/ui/scroll-view';
import { ListView, ItemEventData } from 'tns-core-modules/ui/list-view';
import { Button } from 'tns-core-modules/ui/button';
let page;
// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
  // Get the event sender
  page = <pages.Page>args.object;
  page.bindingContext = new HelloWorldModel();
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
  const list: any = new ListView();
  list.height = '100%';
  const items = [{ name: 'Osei' }, { name: 'Sean' }, { name: 'Brad' }
  , { name: 'Some' }, { name: 'More' }, { name: 'Names' }, { name: 'To' }, { name: 'Make' }
  , { name: 'This' }, { name: 'List' }, { name: 'Scroll' }];
  list.items = items;
  list.itemTemplate = `
    <StackLayout>
        <Label text="{{name}}"/>
    </StackLayout>
    `;
  list.on('itemTap', (args: ItemEventData) => {
    page.bindingContext.hidePopup(
      `${items[args.index]['name']} : ${args.index}`
    );
  });
  page.bindingContext.showPopup(page.getViewById('btnList'), list);
}

export function showTemplatePopup(args) {
  page.bindingContext.showPopup(page.getViewById('btn'), '/template/bomb.xml');
}