import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, take } from 'rxjs';
import { IAuthentication, ICodeDeliveryDetails, IUserCredentials } from 'src/app/core/interfaces/auth.interfaces';
import { AuthenticationProvider } from 'src/app/core/services/authentication.service';
import { LoginService } from 'src/app/services/login.service';
import { CustomValidators } from '../../../utils/customValidation';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrls: ['./create-new-password.component.scss'],
})
export class CreateNewPasswordComponent  implements OnInit {

  userData!: ICodeDeliveryDetails;
  userCredentials!: IUserCredentials;
  counter: number = 90;
	error: string = '';
  eyeSvg: string = '../../../assets/icon/eye-view.svg';
  eyeSlashSvg: string = '../../../assets/icon/eye-hidden.svg';
  isShown: boolean = false;
  otpForm: FormGroup;
  otpDigits = [0, 1, 2, 3, 4, 5];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private login: LoginService,
    @Inject(AuthenticationProvider) private auth: IAuthentication,
    ) {
    this.otpForm = this.fb.group({
      otp: this.fb.array([
        new FormControl('', [Validators.required, CustomValidators.noSpaces]),
        new FormControl('', [Validators.required, CustomValidators.noSpaces]),
        new FormControl('', [Validators.required, CustomValidators.noSpaces]),
        new FormControl('', [Validators.required, CustomValidators.noSpaces]),
        new FormControl('', [Validators.required, CustomValidators.noSpaces]),
        new FormControl('', [Validators.required, CustomValidators.noSpaces])
      ]),
      newPassword: ['', [Validators.required, Validators.minLength(10), CustomValidators.customPasswordValidation]]
    });
  }

  ngOnInit(): void {
    this.initCounter();

    this.login.getRecoverPasswordDataObservable.subscribe((res: ICodeDeliveryDetails) => {
      this.userData = res;
      if (!res) {
        this.router.navigate(['/auth']);
      }
    });

    this.login.getUserCredentialsObservable.subscribe((res: IUserCredentials) => {
      this.userCredentials = res;
      if (!res) {
        this.router.navigate(['/auth']);
      }
    });
  }

  get otpInput() {
    return this.otpForm.get('otp') as FormArray;
  }

  get newPassword() {
    return this.otpForm.get('newPassword') as FormControl;
  }

  onInput(event: KeyboardEvent) {
    this.error = '';
    const input = event.target as HTMLInputElement;
    const index = parseInt(input.id);
    const value = event.key;
    const numbersOnly = /^\d*$/;
    const otpInputControls = this.otpInput.controls[index];

    if (!numbersOnly.test(value) && event.code !== 'Backspace') {
      event.preventDefault();
      return;
    }

    if (value.length === 1 && index < 5) {
        otpInputControls.setValue(value);
        input.value = value;
        event.preventDefault();

        const nextInput = input.nextElementSibling as HTMLInputElement;
        nextInput.focus();
    }

    if (event.code === 'Backspace' && index > 0) {
      if (input.value) {
        otpInputControls.setValue('');
        input.value = '';
        event.preventDefault();
      }

      const prevInput = input.previousElementSibling as HTMLInputElement;
      prevInput.focus();
    }
  }

  handleCharacters(event: KeyboardEvent) {
    const value = event.key;
    const alphanumeric = /^[a-zA-Z0-9]+$/;
    
    if (!alphanumeric.test(value)) {
      event.preventDefault();
      return;
    }
  }

  initCounter() {
    const timer$= interval(1000).pipe(take(90));

    timer$.subscribe(() => {
      this.counter--;
    });
  }

  sendNewCode() {
		  this.auth.recoverPassword(this.userCredentials).then(() => {
      this.counter = 90;
      this.initCounter();
		}).catch((err) => {
      console.log(err);
		});
  }

  navToLogin() {
    this.router.navigate(['recovery-password']);
  }

  confirmPasswordChange() {
		this.auth.confirmRecoverPassword(this.otpInput.value.join(''), this.newPassword.value).then(() => {
      this.router.navigate(['auth']);
    }).catch((err) => {
      this.error = err;
    });
  }

}
