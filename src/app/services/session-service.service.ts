import { inject, Injectable } from '@angular/core';
import {
  DevicesResponse,
  ISession,
} from './interfaces/session-service.interface';
import { Device } from '@capacitor/device';
import { HttpClientService } from '../core/services/http-client.service';
import { environment } from 'src/environments/environment';
import { UserStateService } from '../core/state/user-state.service';
import config from 'capacitor.config';

@Injectable({
  providedIn: 'root',
})
export class SessionServiceService {
  private http = inject(HttpClientService);
  private userState = inject(UserStateService);
  private APP_ID = config.appId ?? 'com.uell.ionic.mobile';

  async handleSession() {
    const deviceId = (await Device.getId()).identifier;
    this.getSession()?.subscribe({
      next: (data) => {
        const exists = data.some((device) => device.deviceId === deviceId);
        if (!exists) this.setSessionData();
      },
    });
  }

  async setSessionData() {
    const deviceId = await Device.getId();
    const userId = this.userState.userId();
    const plataform = (await Device.getInfo()).platform;
    const fcmToken = this.userState.fcmToken();

    if (!(deviceId && userId && plataform && fcmToken)) {
      console.error('Missing data to set session for push notifications');
      return;
    }

    const data: ISession = {
      active: true,
      appName: this.APP_ID,
      userId: userId,
      deviceId: deviceId.identifier,
      tokenFirebase: fcmToken,
      platform: plataform,
    };

    this.postSession(data).subscribe({
      error: (error: any) => console.error('Error posting session', error),
    });
  }

  private getSession() {
    const userId = this.userState.userId();
    const url = `${environment.apiBaseUrl}${environment.apiVersion}/users/session/${userId}`;

    return this.http.get<DevicesResponse>(url);
  }

  private postSession(session: ISession) {
    const url = `${environment.apiBaseUrl}${environment.apiVersion}/users/session`;
    return this.http.post(url, session);
  }
}
