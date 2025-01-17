import { inject, Injectable } from '@angular/core';
import { IFilterPosts } from '../core/interfaces/wellness';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  http = inject(HttpClient)

  constructor() { }

  
  getPosts(filter?: IFilterPosts, postType = null, title = null) {
    let addFilter = '';
    if (filter) {
      addFilter += `?size=${filter.size}`;
      addFilter += `&page=${filter.page}`;
    }
    const data = {
      postType, // number,
      title, // string
      status: null, // number
      initCreatedDate: null, // Date
      finishCreatedDate: null, // Date
    };
    const url = `${environment.apiVersion}/posts/header/user${addFilter}`
    // GET https://apidev.newton-development.com/${environment.apiVersion}/posts/header/user?size=10&page=0
    // return this.apiUtilsS.postDataContent<IContentWrapper<Post[]>>(
    //   `${environment.apiVersion}/posts/header/user${addFilter}`,
    //   data
    // );
    return this.http.get(`${environment.apiBaseUrl}${environment.apiVersion}/posts/header/user${addFilter}`);

  }

  getLastPost() {
    // return this.apiUtilsS.getDataContent<PostDetails>(`${environment.apiVersion}/posts/lastpost?post_type=BIENESTAR`);
    return this.http.get(`${environment.apiBaseUrl}${environment.apiVersion}/posts/lastpost?post_type=BIENESTAR`);
  }

  getPostTypeId() {
    // return this.apiUtilsS.getData<PostDetails>(`${environment.apiVersion}/posts/lastpost?post_type=COMUNICADOS,NOVEDADES`);
    return this.http.get(`${environment.apiBaseUrl}${environment.apiVersion}/posts/lastpost?post_type=COMUNICADOS,NOVEDADES`);
  }
}
