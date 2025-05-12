import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TenantElement, UserResponseDTO } from 'src/app/core/interfaces/user';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-select-tenants',
  templateUrl: './select-tenants.page.html',
  styleUrls: ['./select-tenants.page.scss'],
})
export class SelectTenantsPage implements OnInit {
  user = signal<UserResponseDTO | null>(null);
  loadingUser = false;
  selectedTenant: any;

  private storageService = inject(StorageService);
  private userState = inject(UserStateService);
  private utilsService = inject(UtilsService);
  private userService = inject(UserService);

  formSelectTenant = new FormGroup({
    tenant: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.user.set(this.storageService.getSessionStorage('user'));
    this.loadingUser = true;
  }

  goBack() {
    this.utilsService.goBack();
  }

  onTenantSelected(event: CustomEvent) {
    this.selectedTenant = event.detail.value; // El valor seleccionado
    const tenant: any = this.formSelectTenant.value.tenant;
    this.userState.setTenant(tenant as TenantElement);
  }

  async submit() {
    if (this.formSelectTenant.invalid) {
      return;
    }

    const loading = await this.utilsService.loading();
    await loading.present();
    this.userService.getTenantParameters().subscribe(async (res: any) => {
      this.storageService.setSessionStorage('tenantParameters', res);
      await this.storageService.setLocalStorage('tenant', res);
      const user: any = this.storageService.getSessionStorage('user');
      this.userService.termsAndConditions(user?.id).subscribe((res: any) => {
        if (user.onboarded) {
          this.utilsService.navCtrl.navigateRoot(['tabs/home']);
        } else {
          if (res.length > 0) {
            this.storageService.setSessionStorage('termsAndConditions', res);
            this.storageService.setLocalStorage('tenant', res);
            this.utilsService.navCtrl.navigateRoot(['auth/term-and-conditions']);
          } else {
            this.utilsService.navCtrl.navigateRoot(['auth/onboarding']);
          }
        }
      });
      loading.dismiss();
    });
  }
}
