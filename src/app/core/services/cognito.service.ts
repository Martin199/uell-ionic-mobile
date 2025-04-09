import { Injectable } from '@angular/core';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';
import { IUser, IUserCredentials } from '../interfaces/auth.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  readonly userPool!: CognitoUserPool;
  private cognitoUser!: CognitoUser | null;
  currentUser: IUser | null = null;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: environment.aws.userPoolId,
      ClientId: environment.aws.clientId,
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
    this.cognitoUser = cognitoUser;

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          sessionStorage.setItem('accessToken', result.getIdToken().getJwtToken());
          resolve(result);
        },
        newPasswordRequired: () => {
					this.currentUser = this.buildNewPasswordRequired(username, password);
					resolve(this.currentUser);
					reject((err: any) => console.log(err));
				},
        onFailure: (err) => {
          console.error('Login error:', err);
          reject(err);
        },
      });
    });
  }

  private buildNewPasswordRequired(username: any, password: any): IUser {
		return {
			type: 'passwordChange',
			pass: password,
			entity: {
				id: username,
				name: username
			}
		};
	}

  public getUserFirst(): IUser | null {
		return this.currentUser;
	}

  public changeFirstPassword(password: string): Promise<void> {
		return new Promise((resolve, reject) => {
			if (this.cognitoUser === null) { 
				// TODO handle it, it needs to do a login before.
				return;
			}

			if (this.currentUser && this.currentUser.entity) {
				this.cognitoUser.completeNewPasswordChallenge(password, {
					name: this.currentUser.entity.name
				}, {
					onSuccess: () => {
						this.resetUser();
						resolve();
					},
					onFailure: (err: any) => {
						reject(err);
					}
				});
			} else {
				reject('Current user do not set');
			}
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
