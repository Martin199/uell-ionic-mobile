export interface AdressResponse {
	addressCodePostal: string;
	addressDepartment: string;
	addressFloor: string;
	addressName: string;
	addressNumber?: string;
	addressType: string;
	id?: string | number;
	isPrimary: boolean;
	latitude: string | number;
	locality: Localidad;
	longitude: string | number;
	observation: string | null;
	userId?: any;
	addressValidated: boolean;
	addressGeometryLocationType: string;
	countryCode?: string;
}

export interface Localidad {
	code: string;
	id: string | number;
	name: string;
	state: State;
	tenant: string;
}

export interface State {
	code: string;
	id: string | number;
	name: string;
	tenant: string;
}