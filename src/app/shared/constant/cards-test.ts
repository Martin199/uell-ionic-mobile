import { NutritionCard } from "src/app/pages/tabs/components/nutrition/shared/nutrition-card/nutrition-card.interface";

export const cardHome: NutritionCard[] = [
  {
    title: 'Plan de Comidas',
    image: '/assets/nutrition/home1.svg',
    icon: '/assets/nutrition/icons/planner_banner.svg',
    description:
      'Sigue un plan de alimentación nutritivo basado en tus necesidades y preferencias.',
    navigateTo: '/meal-plan',
  },
  // {
  //   title: 'Recetas',
  //   image: '/assets/nutrition/home2.svg',
  //   icon: '/assets/nutrition/icons/skillet.svg',
  //   description: 'Encuentra inspiracion en nuestra coleccion de recetas saludables.',
  //   navigateTo: '/recipes',
  // },
  // {
   //  title: 'Contenido recomendado',
    // image: '/assets/nutrition/home3.svg',
    // icon: '/assets/nutrition/icons/checklist.svg',
    // description: 'Encuentra recomendaciones personalizadas para tu bienestar integral.',
    // navigateTo: '/recommended-content',
  // },
  {
    title: 'Mis Resultados',
    image: '/assets/nutrition/home-results.svg',
    icon: '/assets/nutrition/icons/gauge-meter.svg',
    description: 'Encuentra recomendaciones personalizadas para tu bienestar integral.',
    navigateTo: '/my-results',
  },
];
