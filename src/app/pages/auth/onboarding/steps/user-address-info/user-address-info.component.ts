import { Component, inject, OnInit, output } from '@angular/core';
import { User } from 'src/app/pages/tabs/interfaces/user-interfaces';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-user-address-info',
  templateUrl: './user-address-info.component.html',
  styleUrls: ['./user-address-info.component.scss'],
})
export class UserAddressInfoComponent  implements OnInit {

  addressInfo = output<{data: any; isValid: boolean}>();
  user! : User ;
  tenantParameters : any;
  country: string = '';
  
  utilsService = inject (UtilsService);
  storageService = inject (StorageService);
  
  constructor() { }

  ngOnInit() {
    this.tenantParameters = this.storageService.getSessionStorage('tenantParameters');
    this.country = this.tenantParameters.tenantParameters.country;
  }

  // observerContactInfoForm() {
  //   this.contactInfoForm.valueChanges.subscribe((value) => {
  //     this.emitAddressInfo(value);
  //   });
  // }

  emitAddressInfo(formValue: any) {
      const contactInfo: any = {
        email: formValue.email,
        countryCode: formValue.countryCode,
        areaCode: formValue.areaCode || null,
        phoneNumber: formValue.phoneNumber,
      };
  
      this.addressInfo.emit({
        data: contactInfo,
        isValid: true,
      });
    }

}
