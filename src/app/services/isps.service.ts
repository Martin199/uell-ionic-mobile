import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../core/services/http-client.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ISPSService {

  http = inject(HttpClientService);
  
  getISPSScore(userId?: number) {
    return this.http.get(`${environment.apiBaseUrl}${environment.apiVersion}/psico-health/getIsIspDone/${userId}`);
  }
}
