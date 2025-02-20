export interface User {
    id:                    number;
    tenant:                TenantElement[];
    name:                  string;
    surname:               string;
    cuil:                  string;
    codeOfEmployed:        string;
    gender:                string;
    emailCorporate:        string;
    email:                 string;
    area:                  string;
    workstation:           string;
    username:              string;
    role:                  Role[];
    medicalCenter:         any[];
    whitelist:             boolean;
    blacklist:             boolean;
    documentType:          string;
    documentNumber:        string;
    address:               Address[];
    maritalStatus:         string;
    onboarded:             boolean;
    bornDate:              string;
    documents:             any[];
    photo:                 null;
    enabled:               boolean;
    updated:               Date;
    supervisorUsers:       SupervisorUser[];
    usersUnderSupervision: any[];
    segmentationUnit:      SegmentationUnit;
    physicalActivity:      boolean;
    nutrition:             boolean;
    loginEnabled:          boolean;
    epsId:                 null;
    salary:                null;
    entryDate:             null;
    ipsId:                 null;
    arlId:                 null;
    pensionFundId:         null;
    testing:               null;
    cellphoneNumber:       PhoneNumber;
    telephoneNumber:       PhoneNumber;
    onboardedDate:         Date;
    unitSegmentationsUser: SegmentationUnit[];
}

export interface Address {
    id:                          number;
    isPrimary:                   boolean;
    addressName:                 string;
    addressNumber:               string;
    addressFloor:                null;
    addressDepartment:           null;
    addressCodePostal:           string;
    locality:                    Locality;
    observation:                 string;
    addressType:                 string;
    latitude:                    number;
    longitude:                   number;
    userId:                      number;
    addressValidated:            boolean;
    addressGeometryLocationType: string;
}

export interface Locality {
    id:     number;
    code:   string;
    name:   string;
    state?: Locality;
}

export interface PhoneNumber {
    id:          number;
    countryCode: string;
    areaCode:    string;
    phoneNumber: string;
}

export interface Role {
    id:     number;
    name:   string;
    tenant: TenantElement;
}


export interface SegmentationUnit {
    id:             number;
    segCode:        string;
    segDescription: string;
}

export interface SupervisorUser {
    id:                           number;
    supervisorUser:               number;
    userUnderSupervision:         number;
    created:                      Date;
    updated:                      Date;
    tenant:                       TenantElement;
    supervisorNotificationConfig: null;
}

export interface TenantElement {
    id:               number;
    name:             string;
    description:      string;
    tenantConfig:     TenantConfig;
    segmentationUnit: SegmentationUnit[];
}

export interface TenantConfig {
    dueReportDay:                             number;
    active:                                   boolean;
    notificationSenderEmail:                  string;
    hours_to_complete_absence_medical:        number;
    hours_to_complete_absence_hospital:       number;
    hours_to_complete_absence_future:         number;
    hours_to_complete_absence_medical_family: null;
    hours_to_complete_absence_spontaneous:    null;
    hours_to_complete_absence_scheduled:      null;
}
