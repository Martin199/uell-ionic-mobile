import { Injectable } from '@angular/core';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  ICognitoStorage
} from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';
import { IUser, IUserCredentials } from '../interfaces/auth.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CognitoService {

  private readonly storage: ICognitoStorage = {
    setItem:    (k, v) => localStorage.setItem(k, v),
    getItem:    (k)    => localStorage.getItem(k),
    removeItem: (k)    => localStorage.removeItem(k),
    clear:            () => localStorage.clear()
  };

  readonly userPool: CognitoUserPool;
  private cognitoUser!: CognitoUser | null;
  currentUser: IUser | null = null;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: environment.aws.userPoolId,
      ClientId:   environment.aws.clientId,
      Storage:    this.storage
    });

    this.cognitoUser = this.userPool.getCurrentUser();
  }

  getIdToken(): string | null {
    const user = this.userPool.getCurrentUser();
    let token: string | null = null;

    user?.getSession((err: any, session: any) => {
      if (!err && session.isValid()) {
        token = session.getIdToken().getJwtToken();
      }
    });
    return token;
  }

  refreshToken(): Observable<string> {
    return new Observable(observer => {
      const user = this.cognitoUser ?? this.userPool.getCurrentUser(); 
      if (!user) { observer.error('No user is currently logged in'); return; }

      user.getSession((err: any, session: any) => {
        if (err || !session) { observer.error('No valid session'); return; }

        const refresh = session.getRefreshToken();
        user.refreshSession(refresh, (err, newSession) => {
          if (err) { observer.error(err); return; }
        
          localStorage.setItem('accessToken', newSession.getAccessToken().getJwtToken());
          localStorage.setItem('idToken',     newSession.getIdToken().getJwtToken());
        
          observer.next(newSession.getIdToken().getJwtToken());
          observer.complete();
        });
      });
    });
  }

  signIn(username: string, password: string): Promise<any> {
    const authDetails = new AuthenticationDetails({ Username: username, Password: password });
    const userData    = { Username: username, Pool: this.userPool };

    const cognitoUser = new CognitoUser(userData);
    this.cognitoUser  = cognitoUser;

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
          localStorage.setItem('accessToken',  result.getAccessToken().getJwtToken());
          localStorage.setItem('idToken',      result.getIdToken().getJwtToken());
          localStorage.setItem('refreshToken', result.getRefreshToken().getToken()); // 👈 mejora 2
          sessionStorage.setItem('accessToken', result.getAccessToken().getJwtToken());
          resolve(result);
        },
        newPasswordRequired: () => {
          this.currentUser = this.buildNewPasswordRequired(username, password);
          resolve(this.currentUser);
        },
        onFailure: reject
      });
    });
  }

  private buildNewPasswordRequired(username: string, password: string): IUser {
    return {
      type: 'passwordChange',
      pass: password,
      entity: { id: username, name: username }
    };
  }

  public getUserFirst(): IUser | null {
    return this.currentUser;
  }

  public changeFirstPassword(password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.cognitoUser) { reject('No user'); return; }

      if (this.currentUser?.entity) {
        this.cognitoUser.completeNewPasswordChallenge(
          password,
          { name: this.currentUser.entity.name },
          {
            onSuccess: () => { this.resetUser(); resolve(); },
            onFailure: reject
          }
        );
      } else {
        reject('Current user not set');
      }
    });
  }

  private getUserPool(): CognitoUserPool {
    return new CognitoUserPool({
      ClientId:   this.userPool.getClientId(),
      UserPoolId: this.userPool.getUserPoolId(),
      Storage:    this.storage
    });
  }

  private getCognitoUser(credentials: IUserCredentials): CognitoUser {
    return new CognitoUser({ Username: credentials.username, Pool: this.getUserPool() });
  }

  public recoverPassword(creds: IUserCredentials): Promise<any> {
    this.cognitoUser = this.getCognitoUser(creds);
    return new Promise((resolve, reject) => {
      this.cognitoUser!.forgotPassword({ onSuccess: resolve, onFailure: reject });
    });
  }

  public confirmRecoverPassword(code: string, newPassword: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.cognitoUser) { reject('User not present'); return; }

      this.cognitoUser.confirmPassword(code, newPassword, {
        onSuccess: () => { this.resetUser(); resolve(); },
        onFailure : err => reject(err.message)
      });
    });
  }

  private resetUser(): void {
    this.cognitoUser = null;
    this.currentUser = null;
  }

  logout(): void {
    this.cognitoUser?.signOut();
    this.resetUser();
    this.storage.clear();
  }
}
