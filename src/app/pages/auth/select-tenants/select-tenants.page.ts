import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserResponseDTO } from 'src/app/core/interfaces/user';
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

  onTenantSelected(event: any) {
    this.selectedTenant = event.detail.value; // El valor seleccionado
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
      const user: any = this.storageService.getSessionStorage('user');
      this.userService.termsAndConditions(user?.id).subscribe((res: any) => {
        if (res.length > 0) {
          this.storageService.setSessionStorage('termsAndConditions', res);
          this.utilsService.router.navigateByUrl('/auth/term-and-conditions');
        } else {
          this.utilsService.router.navigateByUrl('tabs/home');
        }
      });
      loading.dismiss();
    });
  }
}
