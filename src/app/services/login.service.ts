import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAuthentication, ICodeDeliveryDetails, IErrorSecurityCode, ISaveNewPassword, IUserCredentials } from '../core/interfaces/auth.interfaces';
import { AuthenticationProvider } from '../core/services/authentication.service';


@Injectable({
    providedIn: 'root',
  })

export class LoginService {

    private recoverPasswordData$: BehaviorSubject<ICodeDeliveryDetails> = new BehaviorSubject<ICodeDeliveryDetails>(null!);
    private userCredentials$: BehaviorSubject<IUserCredentials> = new BehaviorSubject<IUserCredentials>(null!);
    private saveNewPassword$: BehaviorSubject<ISaveNewPassword> = new BehaviorSubject<ISaveNewPassword>(null!);
    private errorSecurityCode$: BehaviorSubject<IErrorSecurityCode> = new BehaviorSubject<IErrorSecurityCode>(null!);
    private validBackspace$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null!);

    constructor(
        @Inject(AuthenticationProvider) private auth: IAuthentication,
    ) {

    }

    get getRecoverPasswordDataObservable() {
        return this.recoverPasswordData$.asObservable();
    }

    set setRecoverPasswordDataObservable(value: ICodeDeliveryDetails) {
        this.recoverPasswordData$.next(value);
    }

    get getUserCredentialsObservable() {
        return this.userCredentials$.asObservable();
    }

    set setUserCredentialsObservable(value: IUserCredentials) {
        this.userCredentials$.next(value);
    }

    get getSaveNewPasswordObservable() {
        return this.saveNewPassword$.asObservable();
    }

    set setSaveNewPasswordObservable(value: ISaveNewPassword) {
        this.saveNewPassword$.next(value);
    }

    get getErrorSecurityCodeObservable() {
        return this.errorSecurityCode$.asObservable();
    }

    set setErrorSecurityCodeObservable(value: IErrorSecurityCode) {
        this.errorSecurityCode$.next(value);
    }

    get getValidBackspaceObservable() {
        return this.validBackspace$.asObservable();
    }

    set setValidBackspaceObservable(value: boolean) {
        this.validBackspace$.next(value);
    }
}
