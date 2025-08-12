import { Observable } from 'rxjs';

export interface IUserCredentials {
	username: string;
	password: string;
}
export interface IUserEntity {
	id: string;
	name?: string;
	mail?: string;
	roles?: string[];
	currentId?: string;
	tenant?: string;
}

export interface IUser {
	entity: IUserEntity;
	pass?: string;
	token?: string;
	refreshToken?: string;
	type: 'normal' | 'passwordChange';
	tokenExp?: number;
}

export interface IAuthentication {
	login(userCredentials: IUserCredentials): Promise<IUser>;
	logout(): Promise<void>;
	isAuth(): Observable<void>;
	getUser(): IUser | null;
	getUserFirst(): IUser | null;
	changeFirstPassword(password: string): Promise<void>;
	recoverPassword(userCredentials: IUserCredentials): Promise<any>;
	confirmRecoverPassword(code: string, newPassword: string): Promise<void>;
	saveNewPassword(data: {verificationCode: string, newPassword: string}): Promise<void>;
	refreshToken(): Promise<any>;
}

export interface ICodeDeliveryDetails {
	CodeDeliveryDetails?: {
		AttributeName?: string,
    	DeliveryMedium?: string,
    	Destination: string,
	};
}

export interface ISaveNewPassword {	
	verificationCode?: string;
	newPassword?: string;	
}

export interface IErrorSecurityCode {
	message?: string;
	valid?: boolean;
}

export interface ResponseCreateCognitoUser {
  code: string;
  message: string;
}

export interface CreateCognitoUserResponse {
  code: number;
  message: string;
}