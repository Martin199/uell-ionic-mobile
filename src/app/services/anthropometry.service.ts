import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClientService } from '../core/services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AnthropometryService {

  anthropometryStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  anthropometryData$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  httpClientService = inject (HttpClientService)

  constructor() { }

  
  get getAnthropometryStatus(): Observable<boolean> {
		return this.anthropometryStatus$.asObservable();
	}

  set setAnthropometryStatus(isCompleteAndUpdated: boolean) {
    this.anthropometryStatus$.next(isCompleteAndUpdated);
  }

  get getAnthropometryData(): Observable<any> {
		return this.anthropometryData$.asObservable();
  }

  set setAnthropometryData(data: any) {
    this.anthropometryData$.next(data);
  }

  getLast(userId: string) {
    // const url = `${environment.apiVersion}/bodymeasurement/getlast/${userId}`;
    // return this.apiUtilsService.getDataContent(url);

    
    return this.httpClientService.get(`${environment.apiBaseUrl}${environment.apiVersion}/bodymeasurement/getlast/${userId}`);
  }

  getAll(userId: string) {
    // const url = `${environment.apiVersion}/bodymeasurement/getall/${userId}`;
    // return this.apiUtilsService.getDataContent(url);

    return this.httpClientService.get(`${environment.apiBaseUrl}${environment.apiVersion}/bodymeasurement/getall/${userId}`);
  }

  postAnthropometry(body: any) {
    // const url = `${environment.apiVersion}/bodymeasurement`;
    // return this.apiUtilsService.postDataContent(url, body);

    return this.httpClientService.get(`${environment.apiBaseUrl}${environment.apiVersion}/bodymeasurement`);
  }
}
