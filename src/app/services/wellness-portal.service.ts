import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientService } from '../core/services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class WellnessPortalService {

  constructor() { }

  http = inject(HttpClientService);

  getAllPosts() {
    const payload = {
      postType: 3,
      title: null,
      status: null,
      initCreatedDate: null,
      finishCreatedDate: null,
    };
    return this.http.post(`${environment.apiBaseUrl}${environment.apiVersion}/posts/header/user?size=100`, payload);
  }

  getWellnessPortalData(contentType: string, size?: number) {
    size = size || 10;
    return this.http.get(`${environment.apiBaseUrl}${environment.apiVersion}/posts/content?contentType=${contentType}&size=${size}`);
  }
}
