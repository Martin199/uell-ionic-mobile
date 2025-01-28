import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../core/services/http-client.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ISPSScore, ManagerResponse } from '../pages/tabs/interfaces/isps';

@Injectable({
  providedIn: 'root'
})
export class ISPSService {

  httpClientService = inject(HttpClientService)
  
  getISPSScore(userId?: number): Observable<ISPSScore> {
    return this.httpClientService.get<ISPSScore>(`${environment.apiBaseUrl}${environment.apiVersion}/psico-health/getIsIspDone/${userId}`);
  }

  getWellnessManager(managerId: number) {
    return this.httpClientService.get<ManagerResponse>(`${environment.apiBaseUrl}${environment.apiVersion}/psico-health/wellness-manager/${managerId}`);
  }
}
