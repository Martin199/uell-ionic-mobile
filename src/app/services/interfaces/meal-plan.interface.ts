import { NutritionCard } from '../../pages/tabs/components/nutrition/shared/nutrition-card/nutrition-card.interface';
import { ImageClass } from './camera.interfaces';

export interface FoodOption {
  description: string;
  url: string;
  recipeIds?: string;
}

export interface FoodCategory {
  food: string;
  day: number;
  status: string;
  nutUserFoodId: number;
  optionList: FoodOption[];
}

export interface PlanResponse {
  planId: number;
  userId: number;
  tenantId: number;
  optionList: FoodCategory[];
  valoration: number | null;
  valorationDate: string | null;
  created: string;
}

export type MealType = 'DESAYUNO' | 'ALMUERZO' | 'MERIENDA' | 'CENA';

export interface PostMealCompliance {
  planId: number;
  nutUserFoodId: number;
  uploadDate: Date;
  compliance?: string;
  fileName?: string;
  fileContent?: string;
}

export interface MealPlanState {
  selectedCard: NutritionCard | null;
  planId: number;
  reloadMealPlan: boolean;
  disabledValorarionPlan: boolean;
  isLoading: boolean;
  error: string | null;
  fileSelected: ImageClass | null;
}
