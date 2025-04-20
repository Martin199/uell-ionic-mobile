import { Injectable, inject } from '@angular/core';
import { HttpClientService } from '../core/services/http-client.service';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  http = inject(HttpClientService);
  platform = inject(Platform)

  constructor() { }

  trackingUser(userId: string, module: string){
    const deviceType = this.platform.is('android') ? 'Android' : 'iOS';

    const body = {
      userAction: module,
      userRole: "USER",
      device: deviceType
    }
    return this.http.post(`${environment.apiBaseUrl}${environment.apiVersion}/tracking/user-action/${userId}`,body);
  }
}
