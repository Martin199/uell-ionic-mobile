export interface RecipeDetail {
    title: string;
    cook_time: string;
    portions: string;
    rating: number;
    utensils: string[];
    ingredients: string[];
    image: string;
    fav: boolean;
    steps: string[];
    tip?: string;
    nutritionalValue?: NutritionalValue;
  }
  
  export interface NutritionalValue {
    calories: number;
    fiber: number;
    carbohydrates: number;
    totalCarbohydrates: number;
    sugars: number;
    addedSugar: number;
    fat: number;
    saturatedFat: number;
    sodium: number;
    protein: number;
  }