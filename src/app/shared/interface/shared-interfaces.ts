export interface IValidation {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
}

export interface StatusForm {
	nextTitle: string;
	state: {
		status: boolean,
		description: string
	};
}
