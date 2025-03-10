import { Component, output } from '@angular/core';
@Component({
  selector: 'app-user-address-info',
  templateUrl: './user-address-info.component.html',
  styleUrls: ['./user-address-info.component.scss'],
})
export class UserAddressInfoComponent {

  addressInfo = output<{data: any; isValid: boolean}>();
  
  constructor() { }

  emitAddressInfo(formValue: any) {
    this.addressInfo.emit({
      data: formValue.data,
      isValid: formValue.isValid,
    });
  }

}
