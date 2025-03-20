import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-col-contact-info',
  templateUrl: './col-contact-info.component.html',
  styleUrls: ['./col-contact-info.component.scss'],
})
export class COLContactInfoComponent  implements OnInit {

 tenantParameters : any;
  list: any;
  fb = inject(FormBuilder);
  storageService = inject(StorageService);

  personalForm = new FormGroup({
    countryCode: new FormControl(+57, { validators: [Validators.required, Validators.minLength(3)] }),
    areaCode: new FormControl(11, { validators: [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(2)] }),
    phoneNumber: new FormControl('', { validators: [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(7), Validators.maxLength(11)] }),
    email: new FormControl('', { validators: [Validators.required ,  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$')] }),
  });
  

  constructor() { 

    this.tenantParameters = this.storageService.getSessionStorage('tenantParameters');

    // const argentinaPhone = PHONE_CONSTANTS.phone.country.ARGENTINA;
  }

  ngOnInit() {
    console.log('arg contact info');
  }
}
