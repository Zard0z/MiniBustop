import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';

import { ChooseModalPage } from '../choose-modal/choose-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    cities:string[] = ['Paris'];
    city:string = '';

    buses:string[] = ["62", "70", "72"];
    bus:string = '';

    stops:string[] = ['Bibliotheque Francois Mitterrand', 'Trocadéro', 'Charles Michels'];
    stop:string = '';



  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController
  ) {
  }

    selectCity() {
        let data = { "title": "Votre ville", "form": "show_autocomplete", "data": this.cities }
        let modal = this.modalCtrl.create(ChooseModalPage, data);
        modal.onDidDismiss(data => {
            if (data) {
                this.city = data;
            }
        });
        modal.present();
    }

    selectBus() {
        let data = { "title": "Votre ligne", "form": "show_autocomplete", "data": this.buses }
        let modal = this.modalCtrl.create(ChooseModalPage, data);
        modal.onDidDismiss(data => {
            if (data) {
                this.bus = data;
            }
        });
        modal.present();
    }

    selectStop() {
        let data = { "title": "Votre arrêt", "form": "show_autocomplete", "data": this.stops }
        let modal = this.modalCtrl.create(ChooseModalPage, data);
        modal.onDidDismiss(data => {
            if (data) {
                this.stop = data;
            }
        });
        modal.present();
    }

    presentLoadingDefault() {
        let loading = this.loadingCtrl.create({
          content: 'Mise à jour de MiniBus...'
        });
      
        loading.present();
      
        setTimeout(() => {
          loading.dismiss();
        }, 5000);
      }

}
