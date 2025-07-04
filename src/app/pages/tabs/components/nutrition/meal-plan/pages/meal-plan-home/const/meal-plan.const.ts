import { NutritionCard } from '../../../../shared/nutrition-card/nutrition-card.interface';

export const BreakfastCard: NutritionCard = {
  title: 'Titulo desayuno',
  image: '/assets/nutrition/images/breakfast.svg',
  description: '08:00 - Pendiente',
  icon: '../../../../../../../../assets/nutrition/icons/coffee.svg',
  mealPrepInfo: {
    meal: 'DESAYUNO',
    state: 'COMPLETED',
    ingredients: [
      { amount: '1 taza', name: 'avena' },
      { amount: '1 taza', name: 'leche' },
      { amount: '1 cucharadita', name: 'miel' },
      { amount: '1/2 taza', name: 'frutas' },
    ],
  },
};
export const LunchCard: NutritionCard = {
  title: 'Titulo almuerzo',
  image: '/assets/nutrition/images/lunch.svg',
  icon: '../../../../../../../../assets/nutrition/icons/utensils.svg',
  description: '12:00 - Pendiente',
  mealPrepInfo: {
    meal: 'ALMUERZO',
    state: 'COMPLETED',

    ingredients: [
      { amount: '1 porción', name: 'proteína (carne, pollo, pescado)' },
      { amount: '1 porción', name: 'carbohidratos (arroz, pasta, papas)' },
      { amount: '1 porción', name: 'vegetales' },
      { amount: '1 porción', name: 'ensalada' },
    ],
  },
};

export const SnackCard: NutritionCard = {
  title: 'Titulo merienda',
  image: '/assets/nutrition/images/snack.svg',
  icon: '../../../../../../../../assets/nutrition/icons/tea.svg',
  description: '16:00 - Pendiente',
  mealPrepInfo: {
    meal: 'MERIENDA',
    state: 'COMPLETED',

    ingredients: [
      { amount: '1 fruta', name: 'frutos secos' },
      { amount: '1 puñado', name: 'yogur' },
      { amount: '1 barra', name: 'granola' },
    ],
  },
};

export const DinnerCard: NutritionCard = {
  title: 'Titulo cena',
  image: '/assets/nutrition/images/dinner.svg',
  icon: '../../../../../../../../assets/nutrition/icons/utensils.svg',
  description: '20:00 - Pendiente',
  mealPrepInfo: {
    meal: 'CENA',
    state: 'COMPLETED',

    ingredients: [
      { amount: '1 porción', name: 'proteína (carne, pollo, pescado)' },
      { amount: '1 porción', name: 'carbohidratos (arroz, pasta, papas)' },
      { amount: '1 porción', name: 'vegetales' },
      { amount: '1 porción', name: 'ensalada' },
    ],
  },
};

export const recipeBreakfast: NutritionCard = {
  title: 'Titulo desayuno',
  image: '/assets/nutrition/images/breakfast.svg',
  description: 'Breve descripción del desayuno',
  navigateTo: '/meal-prep',
  recipeInfo: {
    id: 0,
    cook_steps: ['pasos de cocinar'],
    nutrition_tips: 'tips de prueba',
    meal: 'BREAKFAST_SNACK',
    portions: '4 porciones',
    ingredients: [
      { amount: '1 porción', name: 'proteína (carne, pollo, pescado)' },
      { amount: '1 porción', name: 'carbohidratos (arroz, pasta, papas)' },
      { amount: '1 porción', name: 'vegetales' },
      { amount: '1 porción', name: 'ensalada' },
    ],
  },
};

export const recipeLunch: NutritionCard = {
  title: 'Titulo almuerzo',
  image: '/assets/nutrition/images/lunch.svg',
  description: 'Breve descripción del almuerzo',
  navigateTo: '/meal-prep',
  recipeInfo: {
    id: 0,
    cook_steps: ['pasos de cocinar'],
    nutrition_tips: 'tips de prueba',
    meal: 'LUNCH_DINNER',
    portions: '4 porciones',
    ingredients: [
      { amount: '1 porción', name: 'proteína (carne, pollo, pescado)' },
      { amount: '1 porción', name: 'carbohidratos (arroz, pasta, papas)' },
      { amount: '1 porción', name: 'vegetales' },
      { amount: '1 porción', name: 'ensalada' },
    ],
  },
};
export const recipeSnack1: NutritionCard = {
  title: 'Titulo snack 1',
  image: '/assets/nutrition/images/snack.svg',
  description: 'Breve descripción del snack 1',
  navigateTo: '/snack-prep',
  recipeInfo: {
    id: 0,
    cook_steps: ['Pasos de cocinar snack 1'],
    nutrition_tips: 'Consejos nutricionales snack 1',
    meal: 'BREAKFAST_SNACK',
    portions: '2 porciones',
    ingredients: [
      { amount: '1 fruta', name: 'frutos secos' },
      { amount: '1 puñado', name: 'yogur' },
      { amount: '1 barra', name: 'granola' },
    ],
  },
};

export const recipeDinner: NutritionCard = {
  title: 'Titulo cena',
  image: '/assets/nutrition/images/dinner.svg',
  description: 'Breve descripción de la cena',
  navigateTo: '/meal-prep',
  recipeInfo: {
    id: 0,
    cook_steps: ['Pasos de cocinar cena'],
    nutrition_tips: 'Consejos nutricionales cena',
    meal: 'LUNCH_DINNER',
    portions: '4 porciones',
    ingredients: [
      { amount: '1 porción', name: 'proteína (carne, pollo, pescado)' },
      { amount: '1 porción', name: 'carbohidratos (arroz, pasta, papas)' },
      { amount: '1 porción', name: 'vegetales' },
      { amount: '1 porción', name: 'ensalada' },
    ],
  },
};
