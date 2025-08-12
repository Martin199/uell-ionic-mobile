export interface InitialClinicalData {
  takesMedication: boolean;
  hadJobAccidents: boolean;
  hadJobSickness: boolean;
  hadPreviousJobs: boolean;
  hadVaccines: boolean;
}

export interface MedicalFormData {
  arterialHypertension: boolean;
  diabetes: boolean;
  respiratory: boolean;
  cardiac: boolean;
  neurological: boolean;
  metabolice: boolean;
}

export interface MedicalFormDataTwo {
  mentalDisorders: boolean;
  oncology: boolean;
  gastrointestinal: boolean;
  spine: boolean;
  endocrinological: boolean;
  infectious: boolean;
  onchologicRespiratory: boolean;
  onchologicGinecological: boolean;
  onchologicNephrourological: boolean;
  onchologicGastrointestinal: boolean;
  onchologicEndocrinal: boolean;
  onchologicNeurological: boolean;
  surgeries: boolean;
  surgeriesDescription: string;
  onchologicInfo: boolean;
}

export interface OnBoardingRequest {
  address: Array<AdressResponse>;
  bornDate: string | null;
  alias: string | null;
  emailCorporate: string | null;
  email: string | null;
  photo: string;
  telephoneNumber: TelephoneNumber | null;
  cellphoneNumber?: TelephoneNumber | null;
  maritalStatus: string | null;
  onboarded: boolean;
  medicalInformation: IMedicalInformation | null;
}

export interface OnBoardingCompleteRequest {
  onboarded: boolean;
}

export interface OnBoardingBasicInfoPatch {
  userAlias: string | null;
  bornDate: string | null;
}

export interface OnBoardingContactPatch {
  email: string;
  cellphoneNumber: TelephoneNumber | null;
  telephoneNumber: TelephoneNumber | null;
}

export interface OnBoardingProfilePicPatch {
  photo: string;
}

export interface OnBoardingCountryPatch {
  countryId: number;
}

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
  country: string;
}

export interface TelephoneNumber {
  countryCode: string | null;
  areaCode: string | null;
  phoneNumber: string | null;
  id: number;
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

export class IMedicalInformation {
  // TO DO
  id?: string;
  height?: string | number;
  weight?: string | number;
  diseases?: string | object | Array<string>;
  medicaments?: string | object | Array<string>;
  surgeries?: string | object | Array<string>;
  smoker?: boolean;
  mentalDisorders?: string | object | Array<string>;

  arterialHypertension?: boolean | null;
  diabetes?: boolean;
  diabetesTypeOne?: boolean;
  diabetesTypeTwo?: boolean;
  diabetesType?: boolean;
  insulineRequiring?: boolean;
  respiratory?: boolean;
  cardiac?: boolean;
  neurological?: boolean;
  metabolice?: boolean;

  oncology?: boolean;
  onchologicRespiratory?: boolean;
  onchologicGinecological?: boolean;
  onchologicNephrourological?: boolean;
  onchologicGastrointestinal?: boolean;
  onchologicEndocrinal?: boolean;
  onchologicNeurological?: boolean;
  others?: boolean;

  gastrointestinal?: boolean;
  spine?: boolean;
  endocrinological?: boolean;
  infectious?: boolean;
  psychiatric?: boolean;
  bodyMassIndex?: string | number;
  medicalHistoryDiseases?: any;
  hasSurgeries?: boolean;
  surgeriesDescription?: string;
}

export interface PersonalFormResponse {
  id?: string;
  email: string | null;
  emailCorporate?: string | null;
  phone: TelephoneNumber | null;
  cellphoneNumber?: TelephoneNumber | null;
  observation?: string;
}

export interface PersonalData {
  idHr: string;
  nombre: string;
  apellido: string;
  tipoDeDocumento: string;
  numeroDeDocumento: string;
  sexo: string;
  fechaDeNacimento: string;
  estadoCivil: string;
}
export interface MedicalHistoryDiseases {
  medicalHistoryDiseases: MedicalHistoryDiseasesClass;
}

export interface MedicalHistoryDiseasesClass {
  isHypertensive: boolean;
  hasDiabetes: string | null;
  respiratory: boolean;
  cardiovascular: boolean;
  neurologic: boolean;
  metabolic: boolean;
  psychiatric: boolean;
  onchologic: boolean;
  onchologicRespiratory: boolean | null;
  onchologicGinecological: boolean | null;
  onchologicNephrourological: boolean | null;
  onchologicGastrointestinal: boolean | null;
  onchologicEndocrinal: boolean | null;
  onchologicNeurological: boolean | null;
  gastrointestinal: boolean;
  spine: boolean;
  endocrinological: boolean;
  infectious: boolean;
  surgeries: boolean | null;
  surgeriesDescription: string | null;
}

export interface WellnessQuestionnaireData {
  moodEnergyWellbeing: MoodEnergyWellbeingData;
  energyConcentration: EnergyConcentrationData;
  nutritionLifestyle: NutritionLifestyleData;
}

export interface MoodEnergyWellbeingData {
  mood_irritability: number;
  impulsive_behavior: number;
  frequent_arguments: number;
  repetitive_episodes: number;
  unable_to_relax: number;
  worried_about_future: number;
  confidence_in_problem_solving: number;
  life_perception_next_3_years: number;
  enjoy_daily_activities: number;
}

export interface EnergyConcentrationData {
  sufficient_energy_daily_tasks: number;
  adequate_concentration: number;
  feeling_unable_to_cope: number;
  feeling_comfortable_with_opposite_sex: number;
  feeling_comfortable_with_unknown_people: number;
  feeling_scared_or_frightened: number;
  feeling_united_with_close_people: number;
  feeling_excluded: number;
  feeling_lonely_in_group: number;
}

export interface NutritionLifestyleData {
  healthy_nutrition: number;
  processed_foods_consumption: number;
  sugary_drinks_consumption: number;
  adequate_sleep_hours: number;
  difficulty_falling_asleep: number;
  restorative_sleep: number;
  work_involves_sitting: number;
  daily_physical_activity: number;
  weekly_sports_practice: number;
}
