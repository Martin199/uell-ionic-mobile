import { Component, computed, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonImg,
  NavController,
} from '@ionic/angular/standalone';
import { MealPlanService } from 'src/app/services/meal-plan.service';
import { CommonModule } from '@angular/common';
import { PostMealCompliance } from 'src/app/services/interfaces/meal-plan.interface';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonImg, CommonModule],
})
export class MealDetailsComponent {
  private navCtrl = inject(NavController);

  private mealPlanService = inject(MealPlanService);

  card = computed(() => this.mealPlanService.selectedCard());

  postMarkDone() {
    const postMealCompliance: PostMealCompliance = {
      planId: this.mealPlanService.planId(),
      nutUserFoodId: this.mealPlanService.nutUserFoodId()!,
      uploadDate: new Date(),
      compliance: 'CUMPLIDO',
    };
    this.mealPlanService
      .postMealCompliance(postMealCompliance)
      .subscribe(() => this.navCtrl.back());
  }

  returnBack() {
    this.navCtrl.back();
  }
}
