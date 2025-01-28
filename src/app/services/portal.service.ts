import { inject, Injectable } from '@angular/core';
import { PostPortalDetails } from '../pages/tabs/interfaces/wellness';
import { environment } from 'src/environments/environment';
import { HttpClientService } from '../core/services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  httpClientService = inject (HttpClientService)

  constructor() { }

  getLastPostPortal() {
    return this.httpClientService.get<PostPortalDetails>(`${environment.apiBaseUrl}${environment.apiVersion}/posts/lastpost?post_type=BIENESTAR`);
  }
  
}
