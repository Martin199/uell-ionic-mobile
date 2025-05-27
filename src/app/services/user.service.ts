import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { EmotionalResponse } from '../shared/interface/mental-status.interfaces';
import { UserResponseDTO } from '../core/interfaces/user';
import { ImageUpload } from './interfaces/camera.interfaces';
import { UserStateService } from '../core/state/user-state.service';
import { TenantParametersResponse } from '../core/interfaces/tenantParameters';
import { InitialClinicalData, MedicalHistoryDiseases, OnBoardingRequest } from '../pages/auth/onboarding/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userSubject = new BehaviorSubject<any>(null);
  private userState = inject(UserStateService);
  user$ = this.userSubject.asObservable();

  http = inject(HttpClient);

  constructor() {
    const savedUser = localStorage.getItem('user');
    this.userSubject = new BehaviorSubject<UserResponseDTO>(
      savedUser ? JSON.parse(savedUser) : null
    );
  }

  setUser(user: any) {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): UserResponseDTO {
    return this.userSubject.getValue();
  }

  getMe() {
    return this.http.get<UserResponseDTO>(
      `${environment.apiBaseUrl}${environment.apiVersion}/users/me`
    ).pipe(
      tap((user: UserResponseDTO) => this.userState.setUser(user))
    );
  }

  getUserTenants() {
    return this.http.get(
      `${environment.apiBaseUrl}${environment.apiVersion}/tenant/getusertenants`
    );
  }

  getAllSegmentation() {
    return this.http.get(
      `${environment.apiBaseUrl}${environment.apiVersion}/tenant/getallsegmentation`
    );
  }

  postEmotional(userid: any, emotionId: number) {
    const url = `${environment.apiBaseUrl}${environment.apiVersion}/wellness/mental-status/${userid}`;
    return this.http.post<EmotionalResponse>(url, { emotionId: emotionId });
  }

  getTenantParameters() {
    return this.http
      .get<TenantParametersResponse>(
        `${environment.apiBaseUrl}${environment.apiVersion}/tenant/gettenantparameters`
      )
      .pipe(
        tap((tenantParamResponse) => {
          this.userState.setTenantParameters(
            tenantParamResponse.tenantParameters
          );
        })
      );
  }

  termsAndConditions(userId: number) {
    return this.http.get(
      `${environment.apiBaseUrl}${environment.apiVersion}/users/${userId}/roles/USER/terms-and-conditions`
    );
  }

  postTermsAndConditions(userId: number) {
    return this.http.post(
      `${environment.apiBaseUrl}${environment.apiVersion}/users/${userId}/roles/USER/terms-and-conditions`,
      {}
    );
  }

  downloadFile(fileName: string) {
    return this.http.get<string>(
      `${environment.apiBaseUrl}${environment.apiVersion}/file-management/${fileName}?category=licence`
    );
  }

  getAddressesState(filter?: any): Observable<any> {
    return this.http.get(
      `${environment.apiBaseUrl}${environment.apiVersion}/states?sort=name,asc`,
      filter
    );
  }

  public getLocalitiesByState(id: string): Observable<any> {
    return this.http.get(
      `${environment.apiBaseUrl}${environment.apiVersion}/localities?state.id=${id}&size=1000&sort=name,asc`
    );
  }

  postMedicalDiseases(userId: number, body: MedicalHistoryDiseases) {
    return this.http.post(
      `${environment.apiBaseUrl}${environment.apiVersion}/medical-history/${userId}`,
      body
    );
  }

  postCompletenessMedicalInformation(userId: number, body: InitialClinicalData) {
    return this.http.post(
      `${environment.apiBaseUrl}${environment.apiVersion}/medical-history/completeness/${userId}`,
      body
    );
  }

  //TODO: Chequear como vincular al usuario categoria licencia?????
  postProfilePicture(picture: ImageUpload) {
    this.http.post(
      `${environment.apiBaseUrl}${environment.apiVersion}/file-management?category=licence`,
      picture
    );
  }

  postB64Picture(picture: ImageUpload) {
    return this.http.post(
      `${environment.apiBaseUrl}${environment.apiVersion}/file-management?category=licence`,
      picture
    );
  }

  postOnBoarding(id: number, body: OnBoardingRequest) {
    return this.http.patch(
      `${environment.apiBaseUrl}${environment.apiVersion}/users/${id}`,
      body
    );
  }

  getOnBoarding(id: number) {
    return this.http.get(
      `${environment.apiBaseUrl}${environment.apiVersion}/users/onboarding/${id}`
    );
  }

	getUsedMail(userId: number, mail: string) {
    return this.http.get(
      `${environment.apiBaseUrl}${environment.apiVersion}/users/emailValidate?id=${userId}&email=${mail}`
    );
	}
}
