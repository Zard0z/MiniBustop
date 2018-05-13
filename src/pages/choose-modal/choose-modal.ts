import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ChooseBusModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-choose-modal',
  templateUrl: 'choose-modal.html',
})
export class ChooseModalPage {

  data:any;
  auto_complete:any;
  selected_item:any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public viewCtrl: ViewController
  ) {
      this.data = this.navParams.get('data');
      this.auto_complete = this.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseModalPage');
  }


  getItems(ev) {
      // set val to the value of the ev target
      let val = ev.target.value;
      console.log(val);
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
          this.data = this.auto_complete.filter((item) => {
              return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
      }
      console.log(this.data);
  }

  clearItems(ev) {
      // set val to the value of the ev target
      let val = ev.target.value;
      console.log(val);
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
          this.data = this.auto_complete.filter((item) => {
              return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
      }
  }

  selectedItem(item) {
      console.log('clicked');
      this.viewCtrl.dismiss(item);
  }

  cancel(){
      this.viewCtrl.dismiss();
  }

}
