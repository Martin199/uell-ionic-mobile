import { AbstractControl} from '@angular/forms';

export class CustomValidators {

    static noSpaces(control: AbstractControl) {
        const value = control.value?.trim()?.length;
        if (value <= 0) {
            return  {isValid: false};
        }
        return null;
    }

    static customPasswordValidation(control: AbstractControl) {
        const value = control.value?.trim();
        const errors: any = {};

        if (!/[A-Z]/.test(value)) {
            errors.oneCapitalLetter = 'At least one capital letter.';
        }

        if (!/[a-z]/.test(value)) {
            errors.oneLowercaseLetter = 'At least one lowercase letter.';
        }

        if (!/\d/.test(value)) {
            errors.oneNumber = 'At least one number.';
        }

        return Object.keys(errors).length ? errors : null;
    }
}
