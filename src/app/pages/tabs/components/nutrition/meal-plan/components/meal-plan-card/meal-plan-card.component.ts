import { Component, input, OnInit } from '@angular/core';
import { IonImg } from '@ionic/angular/standalone';
import { NutritionCard } from '../../../shared/nutrition-card/nutrition-card.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meal-plan-card',
  templateUrl: './meal-plan-card.component.html',
  styleUrls: ['./meal-plan-card.component.scss'],
  imports: [IonImg, CommonModule],
})
export class MealPlanCardComponent {
  nutritionCard = input<NutritionCard>();
  typeFood = input<string>('');

  getTime() {
    switch (this.typeFood().toUpperCase()) {
      case 'DESAYUNO':
        return '8:00';
      case 'ALMUERZO':
        return '12:00';
      case 'MERIENDA':
        return '16:00';
      case 'CENA':
        return '20:00';
      default:
        return '';
    }
  }
}
