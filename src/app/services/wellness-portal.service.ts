import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientService } from '../core/services/http-client.service';
import { IResponsePostLikes, IWellnessPortalPost } from '../pages/tabs/interfaces/wellness-portal-interfaces';
import { map, Observable } from 'rxjs';

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

  getPostById(id: number): Observable<IWellnessPortalPost> {
    return this.http.get<IWellnessPortalPost>(`${environment.apiBaseUrl}${environment.apiVersion}/posts/${id}`);
    // return this.http.get<PostDetails>(`${environment.apiBaseUrl}${environment.apiVersion}/posts/${id}`);
  }

  postLikes(id: number, data: any): Observable<IResponsePostLikes>{
    return this.http.patch(`${environment.apiBaseUrl}${environment.apiVersion}/posts/likes/${id}`, data)
  }

  readPostlikes(id: number) {
    return this.http.get<any>(`${environment.apiBaseUrl}${environment.apiVersion}/posts/${id}`)
    .pipe(
      map( res => {
        const objectLikes = { likes: res.likes, dislikes: res.dislikes }
        return objectLikes
      })
    )
  }

  checkAsRead(id: number, platform?: string) {
    return this.http.post(`${environment.apiBaseUrl}${environment.apiVersion}/posts/read/${id}/${ platform }`, {});
  }
}
