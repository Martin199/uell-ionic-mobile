import { Injectable } from '@angular/core';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';
import { IUser, IUserCredentials } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  readonly userPool!: CognitoUserPool;
  private cognitoUser!: CognitoUser | null;
  currentUser: IUser | null = null;

  constructor() {
    this.userPool = new CognitoUserPool({
      //stage
      // UserPoolId: 'us-east-1_C8KOLsIvS',
      // ClientId: '247svd02gbu18j7pgepn2v9vqk',

      // -----------qa----------------
      // UserPoolId: 'us-east-1_VgovTfmV2',
      // ClientId: '3h53imnpjvm0ehmkkh7vd6lj8o',

      //----------dev----------------
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

  private getUserPool(): CognitoUserPool {
		const clientId: string =  this.userPool.getClientId();
		const userPoolId: string = this.userPool.getUserPoolId();

		return new CognitoUserPool({
			ClientId: clientId,
			UserPoolId: userPoolId
		});
	}

  private getCognitoUser(credentials: IUserCredentials): CognitoUser {
		return new CognitoUser({
			Username: credentials.username,
			Pool: this.getUserPool()
		});
	}

  public recoverPassword(userCredentials: IUserCredentials): Promise<any> {
		return new Promise((resolve, reject) => {
			this.cognitoUser = this.getCognitoUser(userCredentials);
			this.cognitoUser.forgotPassword({
				onSuccess: resolve,
				onFailure: reject,
			});
		});
	}

  public confirmRecoverPassword(code: string, newPassword: string): Promise<void> {
		return new Promise((resolve, reject) => {
			if (!this.cognitoUser) {
				reject('User not present.');
				return;
			}

			this.cognitoUser.confirmPassword(code, newPassword, {
					onSuccess: () => {
						this.resetUser();
						resolve();
					},
					onFailure: (err) => {
						reject(err.message);
					}
				});
		});
	}

  private resetUser() {
		this.cognitoUser = null;
		this.currentUser = null;
	}

  logout() {
    this.cognitoUser?.signOut();
  }
}
