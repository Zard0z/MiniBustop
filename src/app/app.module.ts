import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ChooseModalPage } from '../pages/choose-modal/choose-modal';
import { LoadingPage } from '../pages/loading/loading';

import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { StatusBar } from '@ionic-native/status-bar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ChooseModalPage,
    LoadingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ChooseModalPage,
    LoadingPage
  ],
  providers: [
    SplashScreen,
    Network,
    StatusBar,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
