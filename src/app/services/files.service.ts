import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientService } from '../core/services/http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor() { }

  http = inject(HttpClientService);

  downloadFile(fileName: string): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}${environment.apiVersion}/file-management/${fileName}?category=licence`);
  }

}
