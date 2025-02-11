export interface ISPSScore {
    score: number;
    emotionalScore: number;
    physicalScore: number;
    socialScore: number;
    remainingSessions: number;
    totalSessions: number
    name: string;
    surname: string;
    allowRedoIt: null;
    updated: string;
    managerId?: number;
}

export interface ManagerResponse{
    managerId:        number;
    managerName:      string;
    managerSurname:   string;
    managerBiography: string;
    profilePicture:   string;
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
    fastfoodConsuming: string
    moodSwings: string;
    cantFaceAllToDo: string;
    unableToRelax: string
    enoughSleep: string
    anxiousMannerisms: string; 
    feelLeftBehind: string;
}
