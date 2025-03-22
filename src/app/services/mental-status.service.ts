import { inject, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalMentalStatusComponent } from '../shared/componentes/modals-components/modal-mental-status/modal-mental-status.component';
import { environment } from 'src/environments/environment';
import { HttpClientService } from '../core/services/http-client.service';
import { Observable } from 'rxjs';
import { IMentalStatusResponse } from '../shared/interface/mental-status.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MentalStatusService {

  private modalCtrl = inject(ModalController)
  httpClientService = inject(HttpClientService)

  constructor() { }

  getMentalStatus(userId?: number): Observable<IMentalStatusResponse> {
    const userIdParam: string = userId ? `/${userId}` : '';
    return this.httpClientService.get<IMentalStatusResponse>(`${environment.apiBaseUrl}${environment.apiVersion}/wellness/mental-status${userIdParam}`);
  }

  postMentalStatus(userId: number, payload: any) {
    const url: string = `${environment.apiBaseUrl}${environment.apiVersion}/wellness/mental-status/${userId}`;
    return this.httpClientService.post(url, payload);
  }

  openModalMentalStatus() {
    this.modalCtrl.create({
      component: ModalMentalStatusComponent,
      cssClass: 'modal-mental-status',
      backdropDismiss: false,
      showBackdrop: true,
      keyboardClose: false,
      mode: 'ios',
    }).then((modal) => {
      modal.present();
    });
  }
}
