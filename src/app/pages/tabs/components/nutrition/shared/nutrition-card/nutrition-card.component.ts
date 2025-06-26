import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NutritionCard } from './nutrition-card.interface';

@Component({
  selector: 'app-nutrition-card',
  templateUrl: './nutrition-card.component.html',
  styleUrls: ['./nutrition-card.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class NutritionCardComponent  implements OnInit {

  @Input() nutritionCard!: NutritionCard;
  @Input() typeFood: string = '';
  descriptionCompleted: string = ''

  constructor() { }

  ngOnInit() {
    if(this.nutritionCard?.mealPrepInfo?.state === 'COMPLETED') {
      this.descriptionCompleted = this.nutritionCard.description!.replace('Pendiente','Completo')
    }
  }

}
