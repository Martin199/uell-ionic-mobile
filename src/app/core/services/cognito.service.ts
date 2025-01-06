import { Injectable } from '@angular/core';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  readonly userPool!: CognitoUserPool;
  readonly cognitoUser!: CognitoUser | null;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: 'us-east-1_pJB4tmUgT',
      ClientId: '6msv5nde08td7pv7r0q90fulh6',
    });
    this.cognitoUser = this.userPool.getCurrentUser();
  }

  getIdToken(): string | null {
    let token: string | null = null;

    this.cognitoUser?.getSession((err: any, session: any) => {
      if (!err && session.isValid()) {
        token = session.getIdToken().getJwtToken();
      }
    });

    return token;
  }

  refreshToken(): Observable<string> {
    return new Observable((observer) => {
      if (this.cognitoUser) {
        this.cognitoUser.getSession((err: any, session: any) => {
          if (err || !session) {
            observer.error('No valid session');
          } else {
            const refreshToken = session.getRefreshToken();
            this.cognitoUser?.refreshSession(refreshToken, (err, session) => {
              if (err) {
                observer.error(err);
              } else {
                observer.next(session.getIdToken().getJwtToken());
                observer.complete();
              }
            });
          }
        });
      } else {
        observer.error('No user is currently logged in');
      }
    });
  }

  signIn(username: string, password: string): Promise<any> {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          console.log('Access token:', result.getAccessToken().getJwtToken());
          resolve(result);
        },
        onFailure: (err) => {
          console.error('Login error:', err);
          reject(err);
        },
      });
    });
  }

  logout() {
    this.cognitoUser?.signOut();
  }
}
