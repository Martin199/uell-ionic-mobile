export interface PreferencesRestrictionsDTO {
    preferencesList?:     PreferencesList[];
    restrictionsList?:    RestrictionsList[];
    kitchenUtensilsList?: KitchenUtensilsList[];
}

export interface KitchenUtensilsList {
    id?:          number;
    description?: string;
    url?:         string;
}

export interface PreferencesList {
    id?:          number;
    description?: string;
}

export interface RestrictionsList {
    id?:          number;
    description?: string;
    section?:     Section;
    descriptionFe?: string;
}

export enum Section {
    AlergiasIntolerancias = "ALERGIAS-INTOLERANCIAS",
    Enfermedades = "ENFERMEDADES",
}
