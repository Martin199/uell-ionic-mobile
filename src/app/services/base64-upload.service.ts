import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUploadFile, IUploadResponse } from './interfaces/base64-upload.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Base64UploadService {
  private http = inject(HttpClient);

  uploadFile(file: IUploadFile) {
    const url = `${environment.apiBaseUrl}${environment.apiVersion}/file-management?category=licence`;
    return this.http.post<string>(url, file);
  }

  downloadFile(fileName: string) {
    return this.http.get<string>(
      `${environment.apiBaseUrl}${environment.apiVersion}/file-management/${fileName}?category=licence`
    );
  }
}
