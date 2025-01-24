import { Injectable } from '@angular/core';

@Injectable()

export class RegexCommon {

		alphabetical = '^[a-zA-ZñÑáéíóúÁÉÍÓÚçäÄëïöÖÿÜü \'\`\´\-]+$';

		numeric = '/^[1-9]\d{6,10}$/';

		
		numbers = '^[0-9]+$';

		cuil = '^[0-9-]*$';

		postalCode = '^[0-9]{4}$|^[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{3}$';

		password =  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])([a-zA-Z0-9]){6,}$/;

		specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"¿¡¨^°¬´\\|,<>\/?~ñÑáéíóúÁÉÍÓÚçäÄëïöÖÿÜü.]/;

 		noSpace = /\s/;

		// Split regex to password
		specialCharacter = new RegExp(/\W|_/g);
		number = new RegExp(/\d/);
		upperCase = new RegExp(/[A-Z]/);
}
