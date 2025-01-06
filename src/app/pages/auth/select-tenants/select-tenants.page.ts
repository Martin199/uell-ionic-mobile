import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
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

  formSelectTenant = new FormGroup({
    tenant: new FormControl('', [Validators.required]),
  })

  constructor() { }

  ngOnInit() {
    this.user = this.storageService.getSessionStorage('user');
    console.log(this.user);
  }



  onTenantSelected(event: any) {
    this.selectedTenant = event.detail.value; // El valor seleccionado
    console.log('Tenant seleccionado:', this.selectedTenant);
  }

  submit() {
    console.log(this.formSelectTenant.value)
    if (this.formSelectTenant.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const { tenant } = this.formSelectTenant.value;
    this.storageService.setLocalStorage('tenant', tenant);
    this.utilsService.router.navigate(['tabs/home']);
  }	
}
