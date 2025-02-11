import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { StorageService } from './storage.service';
import { Localization, TenantParameters, TenantParametersResponse } from '../core/interfaces/tenantParameters';
import { User } from '../pages/tabs/interfaces/user-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router)
  modalCtrl = inject(ModalController)
  alertCtrl = inject(AlertController)
  navCtrl = inject(NavController)
  storageService = inject(StorageService)

  constructor() { }

  loading() {
    return this.loadingCtrl.create({ spinner: 'circles' });
  }

  goBack() {
    return this.navCtrl.back();
  }

  getLocalization(path: string) {
    const tenantParameters: TenantParametersResponse | null = this.storageService.getSessionStorage('tenantParameters')
    return tenantParameters?.tenantParameters?.localization[path as keyof Localization]
  }
  
  getUser() {
    return this.storageService.getSessionStorage<User>('user')!;
  }

  async getToastMessage(position: 'top' | 'middle' | 'bottom' , time: number, message:string){
    const toast = await this.toastCtrl.create({
      message: message,
      duration: time,
      position: position,
    });
    await toast.present();
  }

  async showAlert(header: string, message: string, buttons: any[] = ['OK']) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons,
    });
    await alert.present();
  }


  async showConfirmation(
    header: string,
    message: string,
    confirmHandler: () => void,
    cancelHandler?: () => void
  ) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: cancelHandler,
        },
        {
          text: 'Confirmar',
          handler: confirmHandler,
        },
      ],
    });
    await alert.present();
  }

  async showPrompt(
    header: string,
    message: string,
    inputs: any[],
    confirmHandler: (data: any) => void,
    cancelHandler?: () => void
  ) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      inputs,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: cancelHandler,
        },
        {
          text: 'OK',
          handler: confirmHandler,
        },
      ],
    });
    await alert.present();
  }
}
