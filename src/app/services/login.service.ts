import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICodeDeliveryDetails, IUserCredentials } from '../core/interfaces/auth.interfaces';
@Injectable({
    providedIn: 'root',
  })

export class LoginService {

    private recoverPasswordData$: BehaviorSubject<ICodeDeliveryDetails> = new BehaviorSubject<ICodeDeliveryDetails>(null!);
    private userCredentials$: BehaviorSubject<IUserCredentials> = new BehaviorSubject<IUserCredentials>(null!);

    constructor() {}

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

}
