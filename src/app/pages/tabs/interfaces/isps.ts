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