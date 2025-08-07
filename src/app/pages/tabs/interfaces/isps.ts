export interface ISPSScore {
  score: number;
  emotionalScore: number;
  physicalScore: number;
  socialScore: number;
  remainingSessions: number | null;
  totalSessions: number | null;
  userid: string;
  name?: string;
  surname?: string;
  allowRedoIt: boolean | null;
  updated: string;
  managerId?: number | null;
  shortly: boolean;
  dimentionDTO: DimensionDTO[];
  umbral: string;
  descriptionTotalScore: string;
  suggestion: string;
}

export interface DimensionDTO {
  name: string;
  isAffected: boolean;
  subdimentionDTO: SubDimensionDTO[];
}

export interface SubDimensionDTO {
  name: string;
  surname: string;
  allowRedoIt: null;
  updated: string;
  managerId?: number;
  isAffected?: boolean;
  description?: string;
}

export interface ManagerResponse {
  managerId: number;
  managerName: string;
  managerSurname: string;
  managerBiography: string;
  profilePicture: string;
}

export interface ISPSAnswers {
  [key: string]: string;
  personalProblemsHandling: string;
  sugarbasedDrinks: string;
  enjoyDailyActivities: string;
  worryFutureMisfortunes: string;
  feelUnionCloseCircle: string;
  properlyFocus: string;
  impulsive: string;
  properDiet: string;
  frequentlyArgue: string;
  energyForDailyTasks: string;
  futureSelfProjecting: string;
  feelMostTimeAfraid: string;
  feelAloneInGroup: string;
  repairingSleep: string;
  sedentaryJob: string;
  comfortabilityOppositeSexSmalltalk: string;
  sports: string;
  comfortabilityUnknownGroup: string;
  dailyPhysicalActivity: string;
  hardtimeSleeping: string;
  fastfoodConsuming: string;
  moodSwings: string;
  cantFaceAllToDo: string;
  unableToRelax: string;
  enoughSleep: string;
  anxiousMannerisms: string;
  feelLeftBehind: string;
}
