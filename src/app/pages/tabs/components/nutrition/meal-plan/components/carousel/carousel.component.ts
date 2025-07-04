import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, OnInit, output } from '@angular/core';
import { NutritionCard } from '../../../shared/nutrition-card/nutrition-card.interface';
import { Router } from '@angular/router';
import { MealPlanCardComponent } from '../meal-plan-card/meal-plan-card.component';
import { MealPlanCardSkeletonComponent } from '../meal-plan-card/meal-plan-card-skeleton.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  imports: [MealPlanCardComponent, MealPlanCardSkeletonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent implements OnInit {
  nutritionCards = input<NutritionCard[]>([]);
  typeFood = input<string>('');
  selectedCard = output<NutritionCard>();

  router = inject(Router);

  ngOnInit(): void {
    this.initSwiper();
  }

  initSwiper() {
    const swiperElementConstructor = document.querySelectorAll('swiper-container');
    const swiperOptions = {
      slidesPerView: 1.2,
      spaceBetween: 16,
      breakpoints: {
        580: {
          slidesPerView: 1.8,
        },
        1024: {
          slidesPerView: 2.2,
        },
        1200: {
          slidesPerView: 3.5,
        },
        1520: {
          slidesPerView: 4.5,
        },
      },
    };
    swiperElementConstructor.forEach((element) => {
      Object.assign(element, swiperOptions);
      element.initialize();
    });
  }

  cardSelected(card: NutritionCard) {
    this.selectedCard.emit(card);
  }

  applyGrayFilter(card: NutritionCard) {
    return card.mealPrepInfo?.state !== 'PENDING' && card.mealPrepInfo !== undefined;
  }
  navigateToDetail(card: NutritionCard) {
    this.router.navigate(['/newton/wellness/nutrition/meal-detail'], {
      // state: { card, planId: this.planId, allMealsDone: this.allMealsDonde },
    });
  }
}
