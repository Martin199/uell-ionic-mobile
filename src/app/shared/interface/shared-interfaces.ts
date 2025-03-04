export interface IValidation {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
}