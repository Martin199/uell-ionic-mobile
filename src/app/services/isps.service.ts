import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../core/services/http-client.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ISPSAnswers, ISPSScore, ManagerResponse } from '../pages/tabs/interfaces/isps';
import { UserStateService } from '../core/state/user-state.service';

@Injectable({
  providedIn: 'root',
})
export class ISPSService {
  httpClientService = inject(HttpClientService);
  private userState = inject(UserStateService);

  getISPSScore(): Observable<ISPSScore> {
    console.log('getISPSScore');
    return this.httpClientService.get<ISPSScore>(
      `${environment.apiBaseUrl}${environment.apiVersion}/psico-health/getIsIspDone/${this.userState.userData()?.id}`
    );
  }

  getWellnessManager(managerId: number) {
    return this.httpClientService.get<ManagerResponse>(
      `${environment.apiBaseUrl}${environment.apiVersion}/psico-health/wellness-manager/${managerId}`
    );
  }

  getIspsAnswers(userId: number) {
    return this.httpClientService.get<ISPSAnswers>(
      `${environment.apiBaseUrl}${environment.apiVersion}/psico-health/answers/${userId}`
    );
  }

  public postIPSContent(idUser: number, data: any): Observable<any> {
    return this.httpClientService.post(
      `${environment.apiBaseUrl}${environment.apiVersion}/psico-health/${idUser}`,
      data
    );
  }

  public patchIPSContent(idUser: number, data: any): Observable<any> {
    return this.httpClientService.patch(
      `${environment.apiBaseUrl}${environment.apiVersion}/psico-health/${idUser}`,
      data
    );
  }

  postSelfAppointmentManaggerTurnito(idUser: number) {
    return this.httpClientService.post(`${environment.apiBaseUrl}${environment.apiVersion}/psico-health/${idUser}`, {});
  }
}
