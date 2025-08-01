import { Component, input, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { addIcons } from "ionicons";
import * as allIonicons from 'ionicons/icons';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  standalone: false,
})
export class CustomInputComponent implements OnInit {
  textClass = input<string>('');
  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() type!: string;
  @Input() autocomplete!: string;
  @Input() icon!: string;
  // @Input() maxLength!: number;
  pattern = input<string>();
  maxLength = input<number | null>(null);
  popOver = input<string>('');
  @Input() immediateValidation = false;

  isPassword!: boolean;
  hide: boolean = true;

  constructor() {
    addIcons(allIonicons as Record<string, string>);
  }

  ngOnInit() {
    if (this.type === 'password') this.isPassword = true;
  }

  showOrhidePassword() {
    this.hide = !this.hide;
    this.type = this.hide ? 'password' : 'text';
  }

  // Method to prevent invalid characters from being typed
  preventInvalidInput(event: any) {
    const input = event.target;
    const value = input.value;

    // If this is a pattern field (name or surname), filter invalid characters
    if (this.type === 'text' && (this.label === 'Nombre' || this.label === 'Apellido')) {
      const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
      const filteredValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');

      if (value !== filteredValue) {
        input.value = filteredValue;
        this.control.setValue(filteredValue);
        this.control.markAsTouched();
      }
    }

    // If this is a phone field, filter to allow only numbers, spaces, and +
    if (this.type === 'tel' || this.label === 'Teléfono') {
      const filteredValue = value.replace(/[^0-9\s+]/g, '');

      if (value !== filteredValue) {
        input.value = filteredValue;
        this.control.setValue(filteredValue);
        this.control.markAsTouched();
      }
    }
  }

  getFieldError(): string | null | undefined {
    if (!this.control) return null;

    const errors = this.control.errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo debe tener mas de ${errors[key].requiredLength} caracteres`;
        case 'maxlength':
          return `Este campo debe tener menos de ${errors[key].requiredLength + 1} caracteres`;
        case 'min':
          return `Este campo debe ser mayor o igual a ${errors[key].min}`;
        case 'max':
          return `Este campo debe ser menor o igual a ${errors[key].max}`;
        case 'invalidLength':
          return `Este campo debe tener ${errors[key].requiredLength} caracteres`;
        case 'invalidAreaCodeStart':
          return 'El código de área no puede comenzar con 9 o 0';
        case 'invalidPhoneNumberStart':
          return 'El número de teléfono no puede comenzar con 15 o 0';
        case 'pattern':
          if (this.type === 'tel' || this.label === 'Teléfono') {
            return 'Este campo solo permite números, espacios y el símbolo +';
          }
          return 'Este campo solo permite letras y espacios';
        default:
          return 'Hay un error en el campo';
      }
    }
    return null;
  }

  onInput() {
    if (this.immediateValidation && this.control) {
      this.control.markAsTouched();
    }
  }

  isValidField(): boolean {
    const res = this.control.errors && this.control.touched;
    if (typeof res === 'boolean') return res;
    return false;
  }
}
