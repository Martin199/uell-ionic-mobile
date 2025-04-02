import { inject, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalMentalStatusComponent } from '../shared/componentes/modals-components/modal-mental-status/modal-mental-status.component';
import { environment } from 'src/environments/environment';
import { HttpClientService } from '../core/services/http-client.service';
import { Observable, Subject } from 'rxjs';
import { IMentalStatusResponse } from '../shared/interface/mental-status.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MentalStatusService {
  private modalCtrl = inject(ModalController);
  httpClientService = inject(HttpClientService);

  private refreshToCurrentMonthSubject = new Subject<void>();
  refreshToCurrentMonth$ = this.refreshToCurrentMonthSubject.asObservable();

  constructor() {}

  triggerRefreshToCurrentMonth() {
    this.refreshToCurrentMonthSubject.next();
  }

  getMentalStatus(userId?: number): Observable<IMentalStatusResponse> {
    const userIdParam: string = userId ? `/${userId}` : '';
    return this.httpClientService.get<IMentalStatusResponse>(
      `${environment.apiBaseUrl}${environment.apiVersion}/wellness/mental-status${userIdParam}`
    );
  }

  postMentalStatus(userId: number, payload: any) {
    const url: string = `${environment.apiBaseUrl}${environment.apiVersion}/wellness/mental-status/${userId}`;
    return this.httpClientService.post(url, payload);
  }

  getEmotionalMap(
    userId: number,
    year: number,
    month: number
  ): Observable<any> {
    return this.httpClientService.get<any>(
      `${environment.apiBaseUrl}${environment.apiVersion}/wellness/mental-status/${userId}/emotional-map?year=${year}&month=${month}`
    );
  }

  async openModalMentalStatus() {
    const modal = await this.modalCtrl.create({
      component: ModalMentalStatusComponent,
      cssClass: 'modal-mental-status',
      backdropDismiss: false,
      showBackdrop: true,
      keyboardClose: false,
      mode: 'ios',
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    return data.postMentalStatus;
  }

  getMentalSatudByUserMoodRecordId(moodRecordId: number): Observable<any> {
    const url: string = `${environment.apiBaseUrl}${environment.apiVersion}/wellness/mental-status/${moodRecordId}`;
    return this.httpClientService.get(url);
  }

  postMentalSatudByUserMoodRecordId(moodRecordId: number): Observable<any> {
    const payload = {
      id: moodRecordId, //id del userMoodRecordId
      description: null, // descripcion que devuelve el mapa
    };
    const url: string = `${environment.apiBaseUrl}${environment.apiVersion}/wellness/mental-status/${moodRecordId}`;
    return this.httpClientService.post(url, payload);
  }
}
