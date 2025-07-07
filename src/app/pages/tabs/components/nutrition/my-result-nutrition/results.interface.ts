export interface MyResultInformation {
  donutState: string;
  donutProgress: number;
  details: ResultDetails;
}

export interface ResultDetails {
  hidratation: number;
  vegetables: number;
  fruits: number;
  carbohydrates: number;
}

export const resultDemo: MyResultInformation = {
  donutState: 'healty',
  donutProgress: 80,
  details: {
    hidratation: 60,
    vegetables: 40,
    fruits: 50,
    carbohydrates: 60,
  },
};

export interface ResultPlanDTO {
  created?: Date;
  userId?: number;
  tenantId?: number;
  drinksWater?: string;
  thirsty?: string;
  vegetables?: string;
  vegetablesPerDay?: string;
  fruit?: string;
  fruitsPerDay?: string;
  carbohydrates?: string;
  bread?: string;
  salt?: string;
  snacks?: string;
  cookiesSodaJuice?: string;
  sugarSpoons?: string;
  readMeat?: string;
  chicken?: string;
  fish?: string;
  eggs?: string;
  dairy?: string;
  sausages?: string;
  dressings?: string;
  mealPreparation?: string;
  oil?: string;
  breakfasts?: string;
  objective?: null;
  dietPreferences?: string;
  alcohol?: string;
  otherAlergiesRestriction?: string;
  totalScore?: number;
  scoreHidratacion?: number;
  scoreVerduras?: number;
  scoreFrutas?: number;
  scoreHidratos?: number;
  scoreSal?: number;
  scoreAzucar?: number;
  scoreOrigenAnimal?: number;
  scoreDerivados?: number;
  scorePreparacionDeComidas?: number;
  active?: boolean;
  scoreUltraprocesados?: number;
}