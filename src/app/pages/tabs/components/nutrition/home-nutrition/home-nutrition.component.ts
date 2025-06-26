import { Component, inject, OnInit } from '@angular/core';
import { NutritionCardComponent } from '../shared/nutrition-card/nutrition-card.component';
import { NutritionCard } from '../shared/nutrition-card/nutrition-card.interface';
import { cardHome } from 'src/app/shared/constant/cards-test';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home-nutrition',
  templateUrl: './home-nutrition.component.html',
  styleUrls: ['./home-nutrition.component.scss'],
  standalone: true,
  imports: [
    NutritionCardComponent
  ]
})
export class HomeNutritionComponent {

  cardArray: NutritionCard[] = cardHome;

  utilsService = inject(UtilsService)

  constructor() { }

  navigateTo(navigateTo: string) {
    this.utilsService.goTo(`tabs/nutrition${navigateTo}`);
  }

}

