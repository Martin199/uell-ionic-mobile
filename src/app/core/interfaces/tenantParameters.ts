export interface TenantParametersResponse {
    id:               number;
    name:             string;
    description:      string;
    tenantConfig:     TenantConfig;
    tenantParameters: TenantParameters;
    segmentationUnit: null;
}

export interface TenantConfig {
    dueReportDay:                       number;
    active:                             boolean;
    notificationSenderEmail:            string;
    hours_to_complete_absence_medical:  number;
    hours_to_complete_absence_hospital: number;
    hours_to_complete_absence_future:   number;
    isps_days_limit:                    null;
    country_id:                         number;
    daysAlertGracePeriod:               null;
    gmt:                                number;
    maxAllowedDistance:                 null;
}

export interface TenantParameters {
    localization:             Localization;
    country:                  string;
    nutritionNotificationDay: string;
    activeModules:            string[];
}

export interface Localization {
    nutrition:    Nutrition;
    emotions:     Emotions;
    sidebar:      Sidebar;
    profile:      Profile;
    "home-cards": HomeCards;
    onboarding:   { [key: string]: string };
    login:        Login;
    isps:         { [key: string]: string };
    modal:        Modal;
    home:         Home;
}

export interface Emotions {
    hello:        string;
    "feel-today": string;
    thanks:       string;
    "know-you":   string;
    "cheer-up":   string;
    well:         string;
    enjoy:        string;
}

export interface Home {
    "hr-announcements": string;
    discover:           string;
    advertisement:      string;
    publish:            string;
    "go-to-hr":         string;
    notification:       string;
    authorized:         string;
    admitted:           string;
    "go-to-notif":      string;
    requests:           string;
    "go-to-absences":   string;
}

export interface HomeCards {
    "psychosocial-card":   PsychosocialCard;
    "wellness-card":       WellnessCard;
    "healthy-habits-card": HealthyHabitsCard;
    "rrhh-card":           RrhhCard;
    "notification-card":   NotificationCard;
    "license-card":        LicenseCard;
    "achievements-card":   AchievementsCard;
    "emotion-map-card":    EmotionMapCard;
    "healthy-actions":     HealthyActions;
    credits:               Credits;
}

export interface AchievementsCard {
    "main-title":        string;
    "comming-soon":      string;
    "comming-soon-long": string;
    "reward-message":    string;
}

export interface Credits {
    title:    string;
    "how-to": string;
}

export interface EmotionMapCard {
    "main-title": string;
    discouraged:  string;
    "calm-down":  string;
    enthusiastic: string;
}

export interface HealthyActions {
    title:            string;
    subtitle:         string;
    info:             string;
    "in-progress":    string;
    "continue-later": string;
    "not-interested": string;
}

export interface HealthyHabitsCard {
    "main-title":              string;
    message1:                  string;
    "no-answers":              string;
    "complete-healthy-habits": string;
    "read-now":                string;
}

export interface LicenseCard {
    "main-title":   string;
    "goTo-license": string;
}

export interface NotificationCard {
    "main-title":         string;
    "authorized-license": string;
    "license-entered":    string;
    "goTo-notifications": string;
}

export interface PsychosocialCard {
    "main-title":          string;
    "emotional-title":     string;
    "social-title":        string;
    "physical-title":      string;
    progress:              string;
    "recalulate-wellness": string;
    sessions:              string;
    gestor:                string;
}

export interface RrhhCard {
    "main-title": string;
    "read-now":   string;
}

export interface WellnessCard {
    "main-title": string;
    published:    string;
    "read-now":   string;
}

export interface Login {
    "login-title":         string;
    cuil:                  string;
    password:              string;
    "forgot-password":     string;
    session:               string;
    "in-progress":         string;
    contact:               string;
    greetings:             string;
    loading:               string;
    "open-id":             string;
    next:                  string;
    back:                  string;
    sending:               string;
    "restore-pass":        string;
    "enter-code":          string;
    "wrong-code":          string;
    "resend-code":         string;
    "resend-available":    string;
    "new-pass":            string;
    "pass-restrictions":   string;
    char:                  string;
    lower:                 string;
    upper:                 string;
    numb:                  string;
    finish:                string;
    check:                 string;
    "send-code":           string;
    required:              string;
    "select-rol":          string;
    select:                string;
    "terms-conditions":    string;
    "acept-terms-comment": string;
    agreed:                string;
    accepting:             string;
    "acept-terms":         string;
    cancel:                string;
}

export interface Modal {
    "modal-cancel":        string;
    "modal-cancel-sesion": string;
    quit:                  string;
    back:                  string;
    acept:                 string;
    mail:                  string;
    "mail-registered":     string;
    "invalid-address":     string;
    retry:                 string;
    continue:              string;
    "validate-as":         string;
    "confirm-or-modify":   string;
    validate:              string;
    "no-validate":         string;
    "clinical-history":    string;
    advertisement:         string;
    cancel:                string;
    send:                  string;
}

export interface Nutrition {
    firtsCardHydration:              FirtsCardHydration;
    secondCardHydration:             SecondCardHydration;
    thirdCardHydration:              ThirdCardHydration;
    firtsCardVegetables:             FirtsCardVegetables;
    secondCardVegetables:            SecondCardVegetables;
    thirdCardVegetables:             ThirdCardVegetables;
    firtsCardFruit:                  FirtsCardFruit;
    secondCardFruit:                 SecondCardFruit;
    thirdCardFruit:                  ThirdCardFruit;
    firtsCardCereals:                FirtsCardCereals;
    secondCardCereals:               SecondCardCereals;
    thirdCardCereals:                ThirdCardCereals;
    firtsCardSalt:                   FirtsCardSalt;
    secondCardSalt:                  SecondCardSalt;
    thirdCardSalt:                   ThirdCardSalt;
    firtsCardSugar:                  FirtsCardSugar;
    secondCardSugar:                 SecondCardSugar;
    thirdCardSugar:                  ThirdCardSugar;
    firtsCardMeats:                  FirtsCardMeats;
    secondCardMeats:                 SecondCardMeats;
    thirdCardMeats:                  ThirdCardMeats;
    fourthCardMeats:                 CardMeats;
    fiveCardMeats:                   CardMeats;
    firtsCardDairy:                  FirtsCardDairy;
    secondCardDairy:                 SecondCardDairy;
    firtsCardUltraprocesados:        FirtsCardUltraprocesados;
    secondCardUltraprocesados:       SecondCardUltraprocesados;
    thirdCardUltraprocesados:        ThirdCardUltraprocesados;
    firtsCardFoodPreparation:        FirtsCardFoodPreparation;
    secondCardFoodPreparation:       SecondCardFoodPreparation;
    thirdCardFoodPreparation:        ThirdCardFoodPreparation;
    "step-preference-goals":         StepPreferenceGoals;
    "step-preference-feeding":       StepPreferenceFeeding;
    "first-preference-pathologies":  PreferencePathologies;
    "second-preference-pathologies": PreferencePathologies;
}

export interface PreferencePathologies {
    "first-option":  string;
    "second-option": string;
}

export interface FirtsCardCereals {
    "Cereals-option-one":   string;
    "Cereals-option-two":   string;
    "Cereals-option-three": string;
    "Cereals-option-four":  string;
}

export interface FirtsCardDairy {
    "Dairy-option-one":   string;
    "Dairy-option-two":   string;
    "Dairy-option-three": string;
}

export interface FirtsCardFoodPreparation {
    "FoodPreparation-option-one":   string;
    "FoodPreparation-option-two":   string;
    "FoodPreparation-option-three": string;
}

export interface FirtsCardFruit {
    "Fruit-option-one": string;
    "Fruit-option-two": string;
}

export interface FirtsCardHydration {
    "hidration-option-one":   string;
    "hidration-option-two":   string;
    "hidration-option-three": string;
    "hidration-option-four":  string;
}

export interface FirtsCardMeats {
    "Meats-option-one": string;
    "Meats-option-two": string;
}

export interface FirtsCardSalt {
    "Salt-option-one":       string;
    "Vegetables-option-two": string;
}

export interface FirtsCardSugar {
    "Sugar-option-one":   string;
    "Sugar-option-two":   string;
    "Sugar-option-three": string;
}

export interface FirtsCardUltraprocesados {
    "Ultraprocesados-option-one": string;
    "Ultraprocesados-option-two": string;
}

export interface FirtsCardVegetables {
    "Vegetables-option-one": string;
    "Vegetables-option-two": string;
}

export interface CardMeats {
    "Meats-option-nine":   string;
    "Meats-option-ten":    string;
    "Meats-option-eleven": string;
}

export interface SecondCardCereals {
    "Cereals-option-five": string;
    "Cereals-option-six":  string;
}

export interface SecondCardDairy {
    "Dairy-option-four":  string;
    "Dairy-option-five":  string;
    "Dairy-option-six":   string;
    "Dairy-option-seven": string;
}

export interface SecondCardFoodPreparation {
    "FoodPreparation-option-four": string;
    "FoodPreparation-option-five": string;
    "FoodPreparation-option-six":  string;
}

export interface SecondCardFruit {
    "Fruit-option-three": string;
    "Fruit-option-four":  string;
    "Fruit-option-five":  string;
}

export interface SecondCardHydration {
    "hidration-option-five":  string;
    "hidration-option-six":   string;
    "hidration-option-seven": string;
}

export interface SecondCardMeats {
    "Meats-option-three": string;
    "Meats-option-four":  string;
    "Meats-option-five":  string;
}

export interface SecondCardSalt {
    "Salt-option-three": string;
    "Salt-option-four":  string;
    "Salt-option-five":  string;
}

export interface SecondCardSugar {
    "Sugar-option-four": string;
    "Sugar-option-five": string;
}

export interface SecondCardUltraprocesados {
    "Ultraprocesados-option-three": string;
    "Ultraprocesados-option-four":  string;
    "Ultraprocesados-option-five":  string;
}

export interface SecondCardVegetables {
    "Vegetables-option-three": string;
    "Vegetables-option-four":  string;
    "Vegetables-option-five":  string;
}

export interface StepPreferenceFeeding {
    "first-option":  string;
    "second-option": string;
    "third-option":  string;
    "fourth-option": string;
}

export interface StepPreferenceGoals {
    "first-preference-goals":   string;
    "second-preference-goals":  string;
    "third-preference-goals":   string;
    "fourth-preference-goals":  string;
    "fifth-preference-goals":   string;
    "sixth-preference-goals":   string;
    "seventh-preference-goals": string;
}

export interface ThirdCardCereals {
    "Cereals-option-seven": string;
    "Cereals-option-eight": string;
    "Cereals-option-nine":  string;
    "Cereals-option-ten":   string;
}

export interface ThirdCardFoodPreparation {
    "FoodPreparation-option-seven": string;
    "FoodPreparation-option-eight": string;
    "FoodPreparation-option-nine":  string;
}

export interface ThirdCardFruit {
    "Fruit-option-six":   string;
    "Fruit-option-seven": string;
    "Fruit-option-eight": string;
}

export interface ThirdCardHydration {
    "hidration-option-eight": string;
    "hidration-option-nine":  string;
}

export interface ThirdCardMeats {
    "Meats-option-six":   string;
    "Meats-option-seven": string;
    "Meats-option-eight": string;
}

export interface ThirdCardSalt {
    "Salt-option-six":   string;
    "Salt-option-seven": string;
    "Salt-option-eight": string;
}

export interface ThirdCardSugar {
    "Sugar-option-six":   string;
    "Sugar-option-seven": string;
    "Sugar-option-eight": string;
}

export interface ThirdCardUltraprocesados {
    "Ultraprocesados-option-six":   string;
    "Ultraprocesados-option-seven": string;
}

export interface ThirdCardVegetables {
    "Vegetables-option-six":   string;
    "Vegetables-option-seven": string;
    "Vegetables-option-eight": string;
}

export interface Profile {
    "personal-info": string;
    name:            string;
    user:            string;
    "id-number":     string;
    birthdate:       string;
    edit:            string;
    enterprise:      string;
    segmentation:    string;
    area:            string;
    workstation:     string;
    mail:            string;
    "contact-info":  string;
    "country-code":  string;
    "area-code":     string;
    phone:           string;
    street:          string;
    number:          string;
    floor:           string;
    dept:            string;
    "zip-code":      string;
    province:        string;
    locality:        string;
    observations:    string;
}

export interface Sidebar {
    home:               string;
    absences:           string;
    wellness:           string;
    "hr-announcements": string;
    profile:            string;
    help:               string;
    "clinic-history":   string;
    more:               string;
    "absence-notif":    string;
    notifications:      string;
    close:              string;
    "license-request":  string;
}
