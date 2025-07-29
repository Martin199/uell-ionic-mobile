import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonText, IonButton, IonRouterLink } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { FloatingHelpComponent } from '../components/floating-help/floating-help.component';
import { UtilsService } from 'src/app/services/utils.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  imports: [IonButton, IonContent, SharedModule, IonText, RouterLink, IonRouterLink, FloatingHelpComponent],
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent {
  private utils = inject(UtilsService);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private loading = signal<HTMLIonLoadingElement | null>(null);
  form = this.formBuilder.group({
    code: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  navigateToValidateAccount() {
    this.utils.navigateTo('auth/create-account/validate-account');
  }

  getTenantCode() {
    const code = this.form.value.code;
    if (!code) return;
    this.authService.getTenantCode(code).subscribe({
      next: res => {
        if (res === null) return;
        this.generatePassword();
      },
      error: err => {
        console.error('error get tenant code', err);
      },
    });
  }

  generatePassword() {
    const email = this.form.value.email;
    if (!email) return;
    this.authService.generatePassword(email).subscribe({
      next: res => {
        this.loading()?.dismiss();
        this.navigateToValidateAccount();
      },
      error: err => {
        console.error(err);
      },
    });
  }

  async submit() {
    this.loading.set(await this.utils.loading());
    await this.loading()!.present();
    this.getTenantCode();
  }
}
