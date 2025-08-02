export interface GetTenantCodeResponse {
  id: number;
  tenant: string;
  imageLocation: string;
  url: string;
}

export interface ContactFormBody {
  name: string;
  surname: string;
  cuil: string;
  email: string;
  phone: string;
  motive: string;
  comentary?: string;
}

export interface PostWellnessContent {
  enjoyDailyActivities: number;
  personalProblemsHandling: number;
  futureSelfProjecting: number;
  energyForDailyTasks: number;
  properlyFocus: number;
  cantFaceAllToDo: number;
  moodSwings: number;
  impulsive: number;
  frequentlyArgue: number;
  anxiousMannerisms: number;
  unableToRelax: number;
  worryFutureMisfortunes: number;
  comfortabilityOppositeSexSmalltalk: number;
  comfortabilityUnknownGroup: number;
  feelMostTimeAfraid: number;
  feelUnionCloseCircle: number;
  feelLeftBehind: number;
  feelAloneInGroup: number;
  properDiet: number;
  fastfoodConsuming: number;
  sugarbasedDrinks: number;
  enoughSleep: number;
  hardtimeSleeping: number;
  repairingSleep: number;
  sedentaryJob: number;
  dailyPhysicalActivity: number;
  sports: number;
  messageThroughCellphone: boolean;
  shortly: boolean;
}
export interface MoodEnergyWellbeingPostData {
  enjoyDailyActivities?: number;
  personalProblemsHandling?: number;
  futureSelfProjecting?: number;
  moodSwings?: number;
  impulsive?: number;
  frequentlyArgue?: number;
  anxiousMannerisms?: number;
  unableToRelax?: number;
  worryFutureMisfortunes?: number;
}

export interface EnergyConcentrationPostData {
  energyForDailyTasks?: number;
  properlyFocus?: number;
  cantFaceAllToDo?: number;
  comfortabilityOppositeSexSmalltalk?: number;
  comfortabilityUnknownGroup?: number;
  feelMostTimeAfraid?: number;
  feelUnionCloseCircle?: number;
  feelLeftBehind?: number;
  feelAloneInGroup?: number;
}

export interface NutritionLifestylePostData {
  properDiet?: number;
  fastfoodConsuming?: number;
  sugarbasedDrinks?: number;
  enoughSleep?: number;
  hardtimeSleeping?: number;
  repairingSleep?: number;
  sedentaryJob?: number;
  dailyPhysicalActivity?: number;
  sports?: number;
  messageThroughCellphone?: boolean;
  shortly?: boolean;
}
