import { Observable } from 'tns-core-modules/data/observable';
import { Popup } from 'nativescript-popup';
import { ItemEventData } from 'tns-core-modules/ui/list-view/list-view';

export class HelloWorldModel extends Observable {
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
  constructor() {
    super();
  }

  itemTap(args: ItemEventData) {
    this.hidePopup(`${this.items[args.index]['name']} : ${args.index}`);
  }

  showPopup(source, view) {
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
  hidePopup(index) {
    this.popup.hidePopup(index);
  }
}
