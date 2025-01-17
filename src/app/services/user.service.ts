import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { EmotionalResponse } from '../shared/interface/emotional-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  http = inject(HttpClient);
  
  constructor() {
    const savedUser = localStorage.getItem('user');
    this.userSubject = new BehaviorSubject<any>(savedUser ? JSON.parse(savedUser) : null);
   }

  setUser(user: any) {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return this.userSubject.getValue();
  }

  getMe() {
    return this.http.get(`${environment.apiBaseUrl}${environment.apiVersion}/users/me`);
  }

  getUserTenants(){
    return this.http.get(`${environment.apiBaseUrl}${environment.apiVersion}/tenant/getusertenants`);
  }

  getAllSegmentation(){
    return this.http.get(`${environment.apiBaseUrl}${environment.apiVersion}/tenant/getallsegmentation`);
  }

  postEmotional(userid: any, emotionId: number) {
    const url =`${environment.apiBaseUrl}${environment.apiVersion}/wellness/mental-status/${userid}`
    return this.http.post<EmotionalResponse>(url, {emotionId: emotionId});
  }

  getTenantParameters() {
    return this.http.get(`${environment.apiBaseUrl}${environment.apiVersion}/tenant/gettenantparameters`);
  }

  termsAndConditions(userId: number) {
    return this.http.get(`${environment.apiBaseUrl}${environment.apiVersion}/users/${userId}/roles/USER/terms-and-conditions`);
  }

  postTermsAndConditions(userId: number) {
    return this.http.post(`${environment.apiBaseUrl}${environment.apiVersion}/users/${userId}/roles/USER/terms-and-conditions`,{});
  }

  downloadFile(fileName: string) {
    return this.http.get<string>(`${environment.apiBaseUrl}${environment.apiVersion}/file-management/${fileName}?category=licence`);
  }
}
