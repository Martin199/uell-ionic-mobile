import { Component, computed, inject, resource, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonSpinner,
  NavController,
} from '@ionic/angular/standalone';
import { MealPlanService } from 'src/app/services/meal-plan.service';
import { firstValueFrom } from 'rxjs';
import { eachDayOfInterval, endOfWeek, startOfWeek, isSameDay } from 'date-fns';
import { CommonModule } from '@angular/common';
import { FoodCategory, FoodOption } from 'src/app/services/interfaces/meal-plan.interface';
import { BreakfastCard, DinnerCard, LunchCard, SnackCard } from './const/meal-plan.const';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { NutritionCard } from '../../../shared/nutrition-card/nutrition-card.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal-plan-home',
  templateUrl: './meal-plan-home.component.html',
  styleUrls: ['./meal-plan-home.component.scss'],
  imports: [
    CalendarComponent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonTitle,
    IonSpinner,
    CarouselComponent,
    CommonModule,
  ],
})
export class MealPlanHomeComponent {
  private navCtrl = inject(NavController);
  private router = inject(Router);

  private mealPlanService = inject(MealPlanService);

  suggestionsResource = resource({
    loader: () => {
      return firstValueFrom(this.mealPlanService.getMealPlan());
    },
  });

  optionList = computed(() => {
    if (!this.suggestionsResource.hasValue()) return null;
    const optionLists = this.suggestionsResource.value().optionList;
    const optionList = optionLists.filter((option) => {
      if (isSameDay(this.weekDates[option.day - 1], this.selectedDay())) return option;
      else return;
    });
    return optionList;
  });

  selectedDay = signal<Date>(new Date());
  weekDates = computed(() => {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
    const dayIntervals: Date[] = eachDayOfInterval({
      start: weekStart,
      end: weekEnd,
    });
    return dayIntervals;
  })();

  breakFastCards = computed(() => {
    if (!this.optionList()) return;
    const list = this.optionList()!.find((option) => {
      if (option.food === 'DESAYUNO') return option;
      return null;
    });
    const cards = list?.optionList.map((foodOption) => {
      return this.nutritionCard(foodOption, BreakfastCard, list);
    });
    return cards;
  });

  breakfastDisabled = computed(() => {
    if (this.breakFastCards()?.[0]?.mealPrepInfo?.state == 'COMPLETED') return true;
    return false;
  });

  lunchCards = computed(() => {
    if (!this.optionList()) return;
    const list = this.optionList()!.find((option) => {
      if (option.food === 'ALMUERZO') return option;
      return null;
    });
    const cards = list?.optionList.map((foodOption) => {
      return this.nutritionCard(foodOption, LunchCard, list);
    });
    return cards;
  });

  lunchDisabled = computed(() => {
    if (this.lunchCards()?.[0]?.mealPrepInfo?.state == 'COMPLETED') return true;
    return false;
  });

  snackCards = computed(() => {
    if (!this.optionList()) return;
    const list = this.optionList()!.find((option) => {
      if (option.food === 'MERIENDA') return option;
      return null;
    });
    const card = list?.optionList.map((foodOption) => {
      return this.nutritionCard(foodOption, SnackCard, list);
    });
    return card;
  });

  snackDisabled = computed(() => {
    if (this.snackCards()?.[0]?.mealPrepInfo?.state == 'COMPLETED') return true;
    return false;
  });

  dinerCards = computed(() => {
    if (!this.optionList()) return;
    const list = this.optionList()!.find((option) => {
      if (option.food === 'CENA') return option;
      return null;
    });
    const card = list?.optionList.map((foodOption) => {
      return this.nutritionCard(foodOption, DinnerCard, list);
    });
    return card;
  });

  dinerDisabled = computed(() => {
    if (this.dinerCards()?.[0]?.mealPrepInfo?.state == 'COMPLETED') return true;
    return false;
  });

  nutritionCard(foodOption: FoodOption, defaultCard: NutritionCard, category: FoodCategory) {
    const res = this.parseDescription(foodOption.description);
    const resId = this.parseDescriptionId(foodOption.description);
    let card: NutritionCard = {
      title: res.title,
      image: foodOption.url ? foodOption.url : defaultCard.image,
      icon: defaultCard.icon,
      description: foodOption.description,
      mealPrepInfo: {
        ingredients: resId ? resId.ingredients : res.ingredients,
        state: category.status,
        nutUserFoodId: category.nutUserFoodId,
      },
    };
    return card;
  }

  parseDescription(description: string) {
    const parts = description.split('|').map((part) => part.trim());

    if (parts.length < 2) {
      return { title: '', ingredients: [] };
    }
    const [title, ingredientsPart] = parts;

    const ingredients = ingredientsPart.split(';').map((ingredient) => {
      const [amount, name] = ingredient
        .trim()
        .replace(/\t|\n/g, ' ')
        .split('/')
        .map((part) => part.trim());
      return { amount, name };
    });

    return { title, ingredients };
  }

  parseDescriptionId(description: string) {
    const parts = description.split('|').map((part) => part.trim());

    if (parts.length < 2) {
      return { title: 'Fallo parseo plan de comidas', ingredients: [] };
    }

    const [title, ingredientsPart] = parts;
    const ingredients = ingredientsPart
      .split(';')
      .filter((ingredient) => ingredient)
      .map((ingredient) => {
        const [amount, nameId] = ingredient
          .trim()
          .replace(/\t|\n/g, ' ')
          .split('/')
          .map((part) => part.trim());
        const [name, recipeId] = nameId?.includes('#') ? nameId?.split('#') : [nameId, undefined];

        return { amount, name, recipeId };
      });

    return { title, ingredients };
  }

  selectedCard(card: NutritionCard) {
    if (card.mealPrepInfo?.state == 'COMPLETED') return;
    this.mealPlanService.setSelectedCard(card);
    this.router.navigate(['tabs/nutrition/meal-details']);
  }

  returnBack() {
    this.mealPlanService.clearState();
    this.navCtrl.back();
  }
}
