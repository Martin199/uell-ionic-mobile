import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserResponseDTO } from 'src/app/core/interfaces/user';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { UserStateService } from 'src/app/core/state/user-state.service';

@Component({
  selector: 'app-select-tenants',
  templateUrl: './select-tenants.page.html',
  styleUrls: ['./select-tenants.page.scss'],
})
export class SelectTenantsPage implements OnInit {
  user = signal<UserResponseDTO | null>(null);

  userFromStore = inject(UserStateService).user;

  loadingUser = false;
  selectedTenant: any;

  private readonly storageService = inject(StorageService);
  private readonly utilsService = inject(UtilsService);
  private readonly userService = inject(UserService);
  private readonly userState = inject(UserStateService);

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

  onTenantSelected(event: any) {
    this.selectedTenant = event.detail.value;
    const tenant: any = this.formSelectTenant.value.tenant;
    this.storageService.setSessionStorage('tenant', JSON.stringify(tenant));
  }

  async submit() {
    if (this.formSelectTenant.invalid) {
      return;
    }

    const loading = await this.utilsService.loading();
    await loading.present();
    this.userService.getTenantParameters().subscribe((res: any) => {
      this.storageService.setSessionStorage('tenantParameters', res);
      const user = this.userFromStore();
      if (!user) {
        loading.dismiss();
        return;
      }
      this.userService.termsAndConditions(user.id).subscribe((res: any) => {
        if (user.onboarded) {
          this.utilsService.navCtrl.navigateRoot(['tabs/home']);
        } else {
          if (res.length > 0) {
            this.storageService.setSessionStorage('termsAndConditions', res);
            this.utilsService.navCtrl.navigateRoot(['auth/term-and-conditions']);
          } else {
            this.utilsService.navCtrl.navigateRoot(['auth/onboarding']);
          }
        }
        loading.dismiss();
      });
    });
  }
}
