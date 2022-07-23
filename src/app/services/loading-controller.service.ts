import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingControllerService {

  constructor(private loadingCtrl: LoadingController,) { }

  async presentLoading(message: string) { }

  async presentLoadingWithOptions(message: string) { 
    let loading = await this.loadingCtrl.create({
      message
    });
    await loading.present();
  }

  async dismissLoading() { 
    this.loadingCtrl.dismiss();
  }

}
