import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CognitoService } from 'src/app/core/services/cognito.service';
import { RegexCommon } from 'src/app/services/regex.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.page.html',
  styleUrls: ['./create-password.page.scss'],
})
export class CreatePasswordPage   {

  createNewPassForm: FormGroup;

  formBuilder= inject(FormBuilder);
  regex = inject(RegexCommon);
  cognitoService = inject (CognitoService);
  utilsService = inject(UtilsService);

  user: any | null = null; 
  showPass: boolean = false;
  showPass2: boolean = false;
  passwordRules: string[] = [
    '10 caracteres',
    '1 mayúscula',
    '1 número',
    'Ningún caracter especial',
    'Distinta a la anterior'
  ];
  loading: boolean = false;
  
  constructor() { 
    this.user = this.cognitoService.getUserFirst();    
    if (null === this.user) {
			// TODO Handle it
			this.utilsService.router.navigate(['auth']);
			throw new Error('CurrentUser not found');
		}

    this.createNewPassForm = this.formBuilder.group({
			newPass: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern(this.regex.password)]],
			oldPass: [this.user.pass],
			newPass2: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern(this.regex.password)]]
		}, { validator: this.passwordMatchValidator });
  }

  hasShowPass() {
		return this.showPass;
	}

	setShowPass() {
		this.showPass = !this.showPass;
	}

	hasShowPass2() {
		return this.showPass2;
	}

	setShowPass2() {
		this.showPass2 = !this.showPass2;
	}

  onSubmit() {
    this.loading = true;
		if (this.createNewPassForm.valid) {
			this.cognitoService.changeFirstPassword(this.createNewPassForm.value.newPass).then(() => {
				this.utilsService.router.navigate(['login'], {
					queryParams: {
						message: 'no+hemos+podido+completar+la+operacion'
					}
				});
			}).catch((error) => {
				console.error('changeFirstPassword error: ', error);
			}).finally(() => {
				this.loading = false;
				this.utilsService.getToastMessage('bottom',3000,'Contraseña actualizada')
        		this.goToLogin();
			});
		}
	}

  goToLogin(){
    this.utilsService.router.navigate(['auth']);
  }

  passwordMatchValidator(formGroup: FormGroup) {
	const newPass = formGroup.get('newPass')?.value;
	const newPass2 = formGroup.get('newPass2')?.value;
	
	if (newPass !== newPass2) {
	  formGroup.get('newPass2')?.setErrors({ notSame: true });
	} else {
	  formGroup.get('newPass2')?.setErrors(null);
	}
	
	return newPass === newPass2 ? null : { notSame: true };
  }
}
