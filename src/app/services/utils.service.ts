import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular/standalone';
import { StorageService } from './storage.service';
import { Localization, TenantParameters, TenantParametersResponse } from '../core/interfaces/tenantParameters';
import { User } from '../pages/tabs/interfaces/user-interfaces';
import { countryENUM } from '../shared/constant/country-constants';
import { modalEnterAnimation, modalLeaveAnimation } from '../shared/animation/animation-modal';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);
  modalCtrl = inject(ModalController);
  alertCtrl = inject(AlertController);
  navCtrl = inject(NavController);
  storageService = inject(StorageService);

  constructor() {}

  loading() {
    return this.loadingCtrl.create({ spinner: 'circles' });
  }

  goBack() {
    return this.navCtrl.back();
  }

  getLocalization(path: string) {
    const tenantParameters: TenantParametersResponse | null = this.storageService.getSessionStorage('tenantParameters');
    return tenantParameters?.tenantParameters?.localization[path as keyof Localization];
  }

  getUser() {
    return this.storageService.getSessionStorage<User>('user')!;
  }

  async getToastMessage(position: 'top' | 'middle' | 'bottom', time: number, message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: time,
      position: position,
    });
    await toast.present();
  }

  async customToast(
    position: 'top' | 'middle' | 'bottom',
    time: number,
    message: string,
    cssClass?: string,
    icon?: string
  ) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: time,
      position: position,
      cssClass: cssClass,
      icon: icon,
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

  async showConfirmation(header: string, message: string, confirmHandler: () => void, cancelHandler?: () => void) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: cancelHandler,
          cssClass: 'cancel-button',
        },
        {
          text: 'Aceptar',
          cssClass: 'confirm-button-danger',
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

  capitalizeText(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  findCountryEnum(country: string): countryENUM {
    switch (country) {
      case 'ARGENTINA':
        return countryENUM.ARGENTINA;
      case 'COLOMBIA':
        return countryENUM.COLOMBIA;
      case 'PERU':
        return countryENUM.PERU;
      case 'ECUADOR':
        return countryENUM.ECUADOR;
      default:
        return countryENUM.OTHER;
    }
  }

  goTo(path: string) {
    this.navCtrl.navigateRoot([path]);
  }

  async presentModal(component: any, css?: string, data?: any, backdropDismiss?: boolean) {
    const modal = await this.modalCtrl.create({
      showBackdrop: true,
      backdropDismiss: backdropDismiss,
      cssClass: css,
      component: component,
      componentProps: data,
        enterAnimation: modalEnterAnimation,
        leaveAnimation: modalLeaveAnimation,
    });
    await modal.present();

    return new Promise((resolve, reject) => {
      if (!component) {
        reject('Component is not defined');
        return;
      }

      modal.onDidDismiss().then((data) => {
        resolve(data);
      });
    });
  }

  async closeModal(data?: any) {
    await this.modalCtrl.dismiss(data);
  }

  getLocalizationByPath(module: string, valueModule: string) {
    const tenantParameters: TenantParametersResponse | null = this.storageService.getSessionStorage('tenantParameters');
    if (!tenantParameters?.tenantParameters?.localization) {
      return null;
    }

    const localization = tenantParameters.tenantParameters.localization;
    const moduleData = localization[module as keyof Localization];

    if (moduleData && typeof moduleData === 'object') {
      return (moduleData as any)[valueModule] || null;
    }

    return null;
  }
    async presentWinToast(creditPoints: number) {
        creditPoints ? creditPoints : 1;
        const toast = await this.toastCtrl.create({
            message: `🎉 Felicidades, ganaste ${creditPoints} ${creditPoints === 1 ? 'crédito' : 'créditos'
                }`,
            duration: 3000,
            position: 'bottom',
            cssClass: 'custom-toast',
            animated: true,
        });
        await toast.present();
    }

}
