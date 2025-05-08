import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TenantParameters } from 'src/app/core/interfaces/tenantParameters';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-ecu-contact-info',
  templateUrl: './ecu-contact-info.component.html',
  styleUrls: ['./ecu-contact-info.component.scss'],
})
export class ECUContactInfoComponent  implements OnInit {

  tenantParameters : TenantParameters | null = null;
  list: any;
  fb = inject(FormBuilder);
  storageService = inject(StorageService);
  userState = inject(UserStateService);

  personalForm = new FormGroup({
    countryCode: new FormControl(+593, { validators: [Validators.required, Validators.minLength(3)] }),
    areaCode: new FormControl(11, { validators: [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(2)] }),
    phoneNumber: new FormControl('', { validators: [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(6), Validators.maxLength(9)] }),
    email: new FormControl('', { validators: [Validators.required ,  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$')] }),
  });
  

  constructor() { 

    this.tenantParameters  =  this.userState.tenantParameters();
    if (!this.tenantParameters) {
      console.error('No se puede datos de tenantparameters');
      return;
    }
    // const argentinaPhone = PHONE_CONSTANTS.phone.country.ARGENTINA;
  }

  ngOnInit() {
    console.log('arg contact info');
  }
}
