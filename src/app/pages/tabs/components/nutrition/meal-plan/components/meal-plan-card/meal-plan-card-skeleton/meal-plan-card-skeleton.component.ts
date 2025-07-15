import { Component } from '@angular/core';
import { IonSkeletonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-meal-plan-card-skeleton',
  templateUrl: './meal-plan-card-skeleton.component.html',
  styleUrls: ['./meal-plan-card-skeleton.component.scss'],
  standalone: true,
  imports: [IonSkeletonText],
})
export class MealPlanCardSkeletonComponent {
  constructor() {}
}
