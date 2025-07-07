export interface NutritionCard {
  title: string;
  image?: string;
  icon?: string;
  description?: string;
  navigateTo?: string;
  recipeInfo?: RecipeInfo;
  mealPrepInfo?: MealPrepInfo;
}

export interface RecipeInfo {
  cook_steps: string[];
  nutrition_tips: string;
  portions: string;
  id: number;
  meal?: 'BREAKFAST_SNACK' | 'LUNCH_DINNER';
  cook_time?: string;
  rating?: number;
  fav?: boolean;
  ingredients: Ingredients[];
  valoration?: number;
  user_valoration?: number;
}

export interface Ingredients {
  amount: string;
  name: string;
}

export interface MealPrepInfo {
  meal?: 'DESAYUNO' | 'ALMUERZO' | 'MERIENDA' | 'CENA';
  ingredients: Ingridients[];
  state?: string;
  nutUserFoodId?: number;
}

export interface Ingridients {
  amount: string;
  name: string;
  recipeId?: string;
}
