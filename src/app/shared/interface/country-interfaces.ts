import { countryENUM } from "../constant/country-constants";
import { IValidation } from "./shared-interfaces";
export interface ICountryCode {
    phoneCode: string;
    name: string;
    flagUrl?: string;
    country: countryENUM;
}
export interface IContactInfo {
    email: string;
    countryCode: string;
    areaCode?: string | null;
    phoneNumber: string;
}
export interface IAddressInfo {
  street: string;
  number?: string;
  floor?: string;
  apartment?: string;
  postalCode?: string;
  province?: IStatesResponse | null;
  locality?: IlocalitiesResponse | null;
  observation?: string;
}
export interface ICountryAddressValidation {
    street: IValidation;
    number: IValidation;
    floor: IValidation;
    apartment: IValidation;
    postalCode: IValidation;
    province: IValidation;
    locality: IValidation;
    observation: IValidation;
}
export interface IStatesResponse {
    id: number;
    code: any | null;
    name: string;
}
export interface IlocalitiesResponse {
    id: number;
    code: any | null;
    name: string;
    state: IStatesResponse;
}