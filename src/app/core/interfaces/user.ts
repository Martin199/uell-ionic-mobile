export interface UserResponseDTO {
  id: number;
  tenant: TenantElement[];
  name: string;
  surname: string;
  cuil: string;
  codeOfEmployed: string;
  gender: string;
  emailCorporate: string;
  email: string;
  area: Area;
  workstation: string;
  username: string;
  role: Role[];
  medicalCenter: any[];
  whitelist: boolean;
  blacklist: boolean;
  documentType: string;
  documentNumber: string;
  address: Address[];
  maritalStatus: string;
  onboarded: boolean;
  bornDate: Date;
  documents: any[];
  photo: string;
  enabled: boolean;
  updated: Date;
  supervisorUsers: SupervisorUser[];
  usersUnderSupervision: SupervisorUser[];
  segmentationUnit: SegmentationUnit;
  physicalActivity: boolean;
  nutrition: boolean;
  loginEnabled: boolean;
  epsId: number;
  salary: number;
  entryDate: Date;
  ipsId: number;
  arlId: number;
  pensionFundId: number;
  testing: null;
  cellphoneNumber: PhoneNumber;
  telephoneNumber: PhoneNumber;
  onboardedDate: Date;
  unitSegmentationsUser: SegmentationUnit[];
  userAlias: string;
  countryId: number;
}

export interface Address {
    id:                          number;
    isPrimary:                   boolean;
    addressName:                 string;
    addressNumber:               string;
    addressFloor:                string;
    addressDepartment:           string;
    addressCodePostal:           string;
    locality:                    Locality;
    observation:                 null | string;
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

export enum Area {
    Amba = "AMBA",
    Gba = "GBA",
    Uellcolombia = "UELLCOLOMBIA",
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
    tenant: TenantEnum;
}

export enum TenantEnum {
    Emergencias = "emergencias",
    Newton = "newton",
    Uell = "uell",
    Uellcolombia = "uellcolombia",
}

export interface SegmentationUnit {
    id:             number;
    segCode:        Area;
    segDescription: SegDescription;
}

export enum SegDescription {
    AreaMetropolitana = "Area Metropolitana",
    GranBuenosAires = "Gran Buenos Aires",
    Uellcolombia = "uellcolombia",
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
    name:             TenantEnum;
    description:      string;
    tenantConfig:     TenantConfig;
    segmentationUnit: SegmentationUnit[];
}

export interface TenantConfig {
    dueReportDay:                             number;
    active:                                   boolean;
    notificationSenderEmail:                  NotificationSenderEmail;
    hours_to_complete_absence_medical:        number;
    hours_to_complete_absence_hospital:       number;
    hours_to_complete_absence_future:         number;
    hours_to_complete_absence_medical_family: null;
    hours_to_complete_absence_spontaneous:    null;
    hours_to_complete_absence_scheduled:      null;
}

export enum NotificationSenderEmail {
    NoreplyDevUellAI = "noreply-dev@uell.ai",
    NoreplyDevUellCOMAr = "noreply-dev@uell.com.ar",
}
