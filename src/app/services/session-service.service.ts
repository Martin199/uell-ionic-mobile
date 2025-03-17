import { inject, Injectable, OnInit } from '@angular/core';
import { DevicesResponse, ISession } from './interfaces/session-service.interface';
import { Device } from '@capacitor/device';
import { Token } from '@capacitor/push-notifications';
import { UserService } from './user.service';
import { HttpClientService } from '../core/services/http-client.service';
import { environment } from 'src/environments/environment';
import { UserResponseDTO } from '../core/interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class SessionServiceService{

  private userService = inject(UserService)
  private http = inject(HttpClientService)

  private APP_NAME = 'com.uell.ionic.mobile';
  private _fcmToken: Token | null = null;
  private _userInfo = this.userService.getUser();
  private _userSession: ISession | null = null

  set fcmToken(token: Token){
    if(!token) return;
    this._fcmToken = token;
  }

  get fcmToken(): Token | null{
    return this._fcmToken;
  }
  
  async handleSession(user: UserResponseDTO){
    const deviceId = (await Device.getId()).identifier;
    this._userInfo = user;
    this.getSession()?.subscribe({
      next: (data) => {
        console.log('get sessions data', data);
        const exists = data.some(device => device.deviceId === deviceId);
        if(!exists) this.setSessionData();
      }
    })
  }

  async setSessionData() {
    const deviceId = await Device.getId();
    const userId = this._userInfo.id;
    const plataform = (await Device.getInfo()).platform;

    const data: ISession = {
      active: true,
      appName: this.APP_NAME,
      userId: userId,
      deviceId: deviceId.identifier,
      tokenFirebase: this._fcmToken?.value,
      platform: plataform,
    }

    this._userSession = data;

    this.postSession(data).subscribe({
      error: (error: any) => console.error('Error posting session', error),
    })
  }


  private async getSessionData(id: string) {
    return this._userSession
  }

  private getSession(){
    const userId = this._userInfo.id;
    console.log('user info', this._userInfo);
    // const session = this._userSession;
    const url =`${environment.apiBaseUrl}${environment.apiVersion}/users/session/${userId}`

    // if(!userId || !session) return;

    return this.http.get<DevicesResponse>(url);
  }

  private postSession(session: ISession){
    const userId = this._userInfo.id;
    const url =`${environment.apiBaseUrl}${environment.apiVersion}/users/session`
    return this.http.post(url, session);
  }
}
