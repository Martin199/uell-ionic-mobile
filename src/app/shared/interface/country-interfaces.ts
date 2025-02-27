import { countryENUM } from "../constant/country-constants";

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