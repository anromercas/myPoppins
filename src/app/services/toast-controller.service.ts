import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastControllerService {

  constructor(private toastController: ToastController) { }

  async presentToastBottom(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  async presentToastCenter(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      position: 'middle',
      duration: 2000,
      color: color
    });
    toast.present();
  }

}
