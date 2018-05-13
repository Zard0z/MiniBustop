import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

import { HomePage } from '../home/home';

/**
 * Generated class for the LoadingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {

  constructor(
      public navCtrl: NavController,
      public network: Network,
      public navParams: NavParams,
      public alertCtrl: AlertController
  ) {


      // watch network for a connection
      let connectSubscription = this.network.onConnect().subscribe(() => {
          console.log('network connected!');
          // We just got a connection but we need to wait briefly
          // before we determine the connection type. Might need to wait.
          // prior to doing any api requests as well.
          setTimeout(() => {
              if (this.network.type === 'wifi') {
                this.navCtrl.push(HomePage);
              }
          }, 3000);
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoadingPage');
  }

  clic(){
      console.log('clic')
  }

    presentAlert() {
        let alert = this.alertCtrl.create({
            title: 'Connected',
            subTitle: '',
            buttons: ['Ok']
        });
        alert.present();
    }

}
