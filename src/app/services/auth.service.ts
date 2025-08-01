import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ContactFormBody, GetTenantCodeResponse, PostWellnessContent } from './interfaces/auth-service.interfaces';
import { EMPTY, map, Observable } from 'rxjs';
import { UserStateService } from '../core/state/user-state.service';
import { UserResponseDTO } from '../core/interfaces/user';
import { CreateCognitoUserResponse, ResponseCreateCognitoUser } from '../core/interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  tenant = signal<string | null>(null);
  email = signal<string | null>(null);
  private userState = inject(UserStateService);

  getTenantCode(code: string) {
    const url = `${environment.apiBaseUrl}${environment.apiVersion}/tenant/get-tenant-code?code=${code}`;
    return this.http.get<GetTenantCodeResponse[]>(url).pipe(
      map(res => {
        if (res === null) return null;
        const tenant = res[0]?.tenant;
        if (tenant) {
          this.tenant.set(tenant);
        }
        return res[0] ?? null;
      })
    );
  }

  getCountryCode() {
    const url = environment.apiBaseUrl + environment.apiVersion + '/country';
    return this.http.get<any>(url);
  }

  generatePassword(email: string) {
    const tenant = this.tenant();
    this.email.set(email);
    if (!tenant) return EMPTY;
    const url = `${environment.apiBaseUrl}${environment.apiVersion}/temporalPassword/generate`;
    const headers = { tenant: tenant };
    return this.http.post<CreateCognitoUserResponse>(url, { email }, { headers });
  }

  createCognitoUser(cuil: number, temporaryPassword: number) {
    const url = `${environment.apiBaseUrl}${environment.apiVersion}/temporalPassword/createCognitoUser`;
    const email = this.email();
    const tenant = this.tenant();
    if (!tenant) return EMPTY;
    const headers = { tenant: tenant };
    return this.http.post<ResponseCreateCognitoUser>(url, { cuil, temporaryPassword, email }, { headers });
  }

  postSupportContact(body: ContactFormBody) {
    const url = `${environment.apiBaseUrl}${environment.apiVersion}/help-request/generate`;
    return this.http.post(url, body);
  }

  public postWellnessContent(body: PostWellnessContent): Observable<any> {
    const userId = this.userState.userData()?.id;
    return this.http.post(`${environment.apiBaseUrl}${environment.apiVersion}/psico-health/${userId}`, body);
  }
}
