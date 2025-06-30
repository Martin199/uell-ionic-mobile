import { Component, inject, OnInit } from '@angular/core';
import { NutritionCardComponent } from '../shared/nutrition-card/nutrition-card.component';
import { NutritionCard } from '../shared/nutrition-card/nutrition-card.interface';
import { cardHome } from 'src/app/shared/constant/cards-test';
import { UtilsService } from 'src/app/services/utils.service';
import { IonicModule } from '@ionic/angular';
import { NutritionService } from 'src/app/services/nutrition.service';
import { ResultPlanDTO } from '../my-result-nutrition/results.interface';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { Utils } from '../../home/utils/utils';

@Component({
  selector: 'app-home-nutrition',
  templateUrl: './home-nutrition.component.html',
  styleUrls: ['./home-nutrition.component.scss'],
  standalone: true,
  imports: [
    NutritionCardComponent,
    IonicModule
  ]
})
export class HomeNutritionComponent implements OnInit {

  cardArray: NutritionCard[] = cardHome;
  resultNutrition?: ResultPlanDTO;
  userId: number | null = null;
  umbralDescription: any;
  createdValidator?: boolean;
  private userState = inject(UserStateService);

  utilsService = inject(UtilsService)
  private nutritionServices = inject(NutritionService);

  constructor() { }

  ngOnInit(): void {

    this.userId = this.userState.userId();
    if (!this.userId) {
        console.error('No se puede obtener el id del usuario');
        return;
    }
    
    this.nutritionServices.getLastResultd(this.userId).subscribe((resp: ResultPlanDTO[]) => {
      this.resultNutrition = resp[0];
      this.umbralDescription = Utils.returnUmbralNutrition(this.resultNutrition.totalScore!);
      sessionStorage.removeItem('lastResultdPlan');
      sessionStorage.setItem('lastResultdPlan', String(resp[0].created));
      const lastPlan = sessionStorage.getItem('lastResultdPlan');
      this.createdValidator = Utils.addDaysValidator(lastPlan, 45);
      console.log(this.createdValidator, 'createdValidator');
    });
  }

  navigateTo(navigateTo: string) {
    if (navigateTo === 'tabs/nutrition/my-results') {
      sessionStorage.setItem('resultNutrition', JSON.stringify(this.resultNutrition));
    }
    this.utilsService.goTo(`${navigateTo}`);
  }

}

