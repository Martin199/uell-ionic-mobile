import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-bar-password-security',
  templateUrl: './bar-password-security.component.html',
  styleUrls: ['./bar-password-security.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class BarPasswordSecurityComponent  implements OnInit {

	@Input() password: string = '';

	passwordStrength: string = 'Bajo';
	securityColor: string = '';
	securityLevel: number = 0;
	hasLength: boolean = false;
	hasLower: boolean = false;
	hasUpper: boolean = false;
	hasNumber: boolean = false;
	hasSymbol: boolean = false;

  constructor() { }

  ngOnInit() {}
  
  ngOnChanges(changes: SimpleChanges) {
	if (changes['password']) {
      this.onPasswordInput();
    }
  }

  getSecurityClass(segment: number) {
	  if (this.securityLevel >= segment) {
	  	if (this.securityLevel === 1) {
	  		return { 'active': true, 'red': true };
	  	} else if (this.securityLevel === 2) {
	  		return { 'active': true, 'yellow': true };
	  	} else if (this.securityLevel === 3) {
	  		return { 'active': true, 'green': true };
	  	}
	  }
	  return {};
  }

    onPasswordInput(): void {
		const password = this.password || '';

		// Validaciones básicas
		this.hasLength = password.length >= 12;
		this.hasLower = /[a-z]/.test(password);
		this.hasUpper = /[A-Z]/.test(password);
		this.hasNumber = /[0-9]/.test(password);
		this.hasSymbol = /[^A-Za-z0-9\s]/.test(password);
		const hasConsecutiveSpaces = / {2,}/.test(password);

		if (hasConsecutiveSpaces) {
			// this.error = 'La contraseña no puede contener dos espacios consecutivos.';
			this.passwordStrength = 'Bajo';
			this.securityLevel = 1;
			this.securityColor = 'red';
			return;
		}

		// this.error = ''; 

		const validBasic = this.hasLength && this.hasLower && this.hasUpper && this.hasNumber;

		if (!validBasic) {
			this.passwordStrength = 'Baja';
			this.securityLevel = 1;
			this.securityColor = 'red';
		} else if (validBasic && !this.hasSymbol) {
			this.passwordStrength = 'Media';
			this.securityLevel = 2;
			this.securityColor = '#F2C94C'; // Amarillo
		} else if (validBasic && this.hasSymbol) {
			this.passwordStrength = 'Alta';
			this.securityLevel = 3;
			this.securityColor = '#27AE60'; // Verde
		}
	}

}
