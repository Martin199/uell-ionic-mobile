import { Component, input, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { addIcons } from "ionicons";
import { eyeOutline, eyeOffOutline } from "ionicons/icons";

@Component({
    selector: 'app-custom-input',
    templateUrl: './custom-input.component.html',
    styleUrls: ['./custom-input.component.scss'],
    standalone: false
})
export class CustomInputComponent implements OnInit {

    @Input() label!: string;
    @Input() control!: FormControl;
    @Input() type!: string;
    @Input() autocomplete!: string;
    @Input() icon!: string;
    // @Input() maxLength!: number;
    pattern = input<string>;
    maxLength = input<number | null>(null);

    isPassword!: boolean;
    hide: boolean = true;

    constructor() {
        addIcons({ eyeOutline, eyeOffOutline });
    }

    ngOnInit() {
        if (this.type === 'password') this.isPassword = true;
    }

    showOrhidePassword() {
        this.hide = !this.hide;
        this.type = this.hide ? 'password' : 'text';
    }

    getFieldError(): string | null | undefined {
        if (!this.control) return null;

        const errors = this.control.errors || {};

        for (const key of Object.keys(errors)) {
            switch (key) {
                case 'required':
                    return 'Este campo es requerido';
                case 'minlength':
                    return `Este campo debe tener al menos ${errors[key].requiredLength} caracteres`;
                case 'maxlength':
                    return `Este campo debe tener menos de ${errors[key].requiredLength + 1} caracteres`;
                case 'min':
                    return `Este campo debe ser mayor o igual a ${errors[key].min}`;
                case 'max':
                    return `Este campo debe ser menor o igual a ${errors[key].max}`;
                case 'invalidLength':
                    return `Este campo debe tener ${errors[key].requiredLength} caracteres`;
                default:
                    return 'Hay un error en el campo';
            }
        }
        return null;
    }

    isValidField(): boolean {
        const res = this.control.errors && this.control.touched;
        if (typeof res === 'boolean') return res;
        return false;
    }
}
