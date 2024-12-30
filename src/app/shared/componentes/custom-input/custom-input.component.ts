import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent  implements OnInit {

  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() type!: string;
  @Input() autocomplete!: string;
  @Input() icon!: string;
  isPassword!: boolean;
  hide: boolean = true;

  constructor() { }

  ngOnInit() {
    if (this.type === 'password')  this.isPassword = true;
  }

  showOrhidePassword() {
    this.hide = !this.hide;
    this.type = this.hide ? 'password' : 'text';
  }
}
