import { Component, inject, OnInit } from '@angular/core';
import { User } from 'src/app/pages/tabs/interfaces/user-interfaces';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-user-address-info',
  templateUrl: './user-address-info.component.html',
  styleUrls: ['./user-address-info.component.scss'],
})
export class UserAddressInfoComponent  implements OnInit {

    user! : User ;
    tenantParameters : any;
    country: string = '';
  
  utilsService = inject (UtilsService);
  storageService = inject (StorageService);
  
  constructor() { }

  ngOnInit() {
    console.log(this.user, 'user');

    this.tenantParameters = this.storageService.getSessionStorage('tenantParameters');
    this.country = this.tenantParameters.tenantParameters.country;
    console.log(this.tenantParameters,this.country, 'tenantParameters');
  }

}
