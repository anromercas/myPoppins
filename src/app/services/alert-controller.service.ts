import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertControllerService {

  constructor(private alertController: AlertController,) { }


  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'alert-class',
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    })
    await alert.present();
  }

  async presentAlertWithInputsAndButtons(header: string, subHeader: string, message: string, inputs: any[], buttons: any[]) {
    const alert = await this.alertController.create({
      cssClass: 'alert-class',
      header,
      subHeader,
      message,
      inputs,
      buttons
    });
    await alert.present();
   }
}
