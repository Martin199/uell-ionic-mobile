import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-select-tenants',
  templateUrl: './select-tenants.page.html',
  styleUrls: ['./select-tenants.page.scss'],
})
export class SelectTenantsPage implements OnInit {

  user: any;
  selectedTenant: any;

  storageService = inject(StorageService);
  utilsService = inject(UtilsService);
  userService = inject(UserService);

  formSelectTenant = new FormGroup({
    tenant: new FormControl('', [Validators.required]),
  })

  constructor() { }

  ngOnInit() {
    this.user = this.storageService.getSessionStorage('user');
    console.log(this.user);
  }


  goBack() {
    this.utilsService.goBack();
  }


  onTenantSelected(event: any) {
    this.selectedTenant = event.detail.value; // El valor seleccionado
    const tenant: any = this.formSelectTenant.value.tenant
    console.log(tenant.name);
    this.storageService.setSessionStorage('tenant', JSON.stringify(tenant));

  }

  async submit() {
    console.log(this.formSelectTenant.value)
    if (this.formSelectTenant.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const loading = await this.utilsService.loading();
    await loading.present();
    this.userService.getTenantParameters().subscribe((res: any) => {
      console.log(res);
      this.storageService.setSessionStorage('tenantParameters', res);
      const user: any = this.storageService.getSessionStorage('user');
      this.userService.termsAndConditions(user?.id).subscribe((res: any) => {
        console.log(res)
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
