import { inject, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { ModalMentalStatusComponent } from '../shared/componentes/modals-components/modal-mental-status/modal-mental-status.component';
import { environment } from 'src/environments/environment';
import { HttpClientService } from '../core/services/http-client.service';
import { Observable, Subject } from 'rxjs';
import { IEmotionalMapResponse, IMentalStatusResponse, IMoodDayList } from '../shared/interface/mental-status.interfaces';

@Injectable({
    providedIn: 'root',
})
export class MentalStatusService {
    private modalCtrl = inject(ModalController);
    httpClientService = inject(HttpClientService);

    private refreshToCurrentMonthSubject = new Subject<void>();
    private cachedMonths: { [key: string]: IMoodDayList[] } = {};
    refreshToCurrentMonth$ = this.refreshToCurrentMonthSubject.asObservable();

    constructor() { }

    getCachedMonth(key: string): IMoodDayList[] | undefined {
        return this.cachedMonths[key];
    }

    setCachedMonth(key: string, data: IMoodDayList[]) {
        this.cachedMonths[key] = data;
    }

    clearEmotionalCache() {
        this.cachedMonths = {};
    }

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
    ): Observable<IEmotionalMapResponse> {
        return this.httpClientService.get<IEmotionalMapResponse>(
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
        return data;
    }

    getMentalSatudByUserMoodRecordId(
        moodRecordId: number,
        description: string
    ): Observable<IMentalStatusResponse> {
        console.log(description);
        const url: string = `${environment.apiBaseUrl}${environment.apiVersion}/wellness/mental-status/getByUserMoodRecordId?userMoodRecordId=${moodRecordId}&description=${description}`;
        return this.httpClientService.get<IMentalStatusResponse>(url);
    }
}
