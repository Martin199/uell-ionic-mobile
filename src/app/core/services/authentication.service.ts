import { InjectionToken, inject } from '@angular/core';
import { CognitoService } from './cognito.service';

// tslint:disable-next-line: variable-name
export const AuthenticationProvider = new InjectionToken(
		'AuthenticationProvider',
		{ 
			providedIn: 'root', 
			factory: () => {
				// Paso intermedio. Cuando tengamos varios tenant esto decide cual va a cada lado.
				return inject(CognitoService);
			}
		}
	);
