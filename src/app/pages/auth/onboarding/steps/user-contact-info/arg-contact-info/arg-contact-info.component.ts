import { Component, computed, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-arg-contact-info',
    templateUrl: './arg-contact-info.component.html',
    styleUrls: ['./arg-contact-info.component.scss'],
    standalone: false
})
export class ARGContactInfoComponent {

  list: any;
  fb = inject(FormBuilder);
  storageService = inject(StorageService);
  userState = inject(UserStateService);
  tenantParameters = computed(() => this.userState.tenantParameters());

  personalForm = new FormGroup({
    countryCode: new FormControl(+54, { validators: [Validators.required, Validators.minLength(3)] }),
    areaCode: new FormControl(11, { validators: [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(2)] }),
    phoneNumber: new FormControl('', { validators: [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(6)] }),
    email: new FormControl('', { validators: [Validators.required ,  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$')] }),
  });
  

  constructor() { 


    // const argentinaPhone = PHONE_CONSTANTS.phone.country.ARGENTINA;
  }

    

}
