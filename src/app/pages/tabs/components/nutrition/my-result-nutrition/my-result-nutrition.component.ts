import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { donutText, donutTextDescription } from 'src/app/shared/constant/text-constats';
import { MyResultInformation, resultDemo, ResultPlanDTO } from './results.interface';
import { Utils } from '../../home/utils/utils';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { NutritionService } from 'src/app/services/nutrition.service';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonImg,
  IonLabel,
  IonButton,
} from '@ionic/angular/standalone';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { AnthropometryDetailComponent } from '../anthropometry-detail/anthropometry-detail.component';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-my-result-nutrition',
  templateUrl: './my-result-nutrition.component.html',
  styleUrls: ['./my-result-nutrition.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonImg,
    IonLabel,
    IonButton,
    RoundProgressModule,
    AnthropometryDetailComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyResultNutritionComponent  implements OnInit {

  storageService = inject(StorageService)

    valor: number = 0;
  donutText = donutText;
  donutDescription = donutTextDescription;
  card: MyResultInformation = resultDemo;
  dimensions = Object.keys(this.card.details);
  dimensionsValues = Object.values(this.card.details);
  resultNutrition?: ResultPlanDTO;
  sessionlastPlan?: ResultPlanDTO;
  umbralDescription: any;
  createdValidator?: boolean;
  max_vegetables?: number;
  max_meat?: number;
  iconGreen = 'assets/nutrition/results/like-green.svg';
  iconYellow = 'assets/nutrition/results/like-yellow.svg';
  iconOrange = 'assets/nutrition/results/dislike-orange.svg';
  iconRed = 'assets/nutrition/results/dislike-red.svg';

  private navCtrl = inject(NavController);

  constructor() { }

  ngOnInit() {
      this.resultNutrition = sessionStorage.getItem('resultNutrition') ? this.storageService.getSessionStorage('resultNutrition') as ResultPlanDTO : undefined;
      this.umbralDescription = Utils.returnUmbralNutrition(this.resultNutrition!.totalScore!);
      const lastPlan = sessionStorage.getItem('lastResultdPlan');
      this.createdValidator = Utils.addDaysValidator(lastPlan, 45);
  }

  goToQuestionnaire() {
    // TODO! PENDIENTE AGREGAR CUESTIONARIO
    // this.modalServices.presentModal(ModalFeedingComponent, 'modal-training', null, false).then();
  }

  getHydrationScoreColorV2(score: number, type?: string): string {
    if ((type === 'verduras' && score === 0) || (type === 'carnes' && score === 0)) {
      return 'progress-green';
    }
    if (score <= 0.3) {
      return 'progress-green'; // Color verde
    } else if (score <= 0.55) {
      return 'progress-yellow'; // Color amarillo
    } else if (score <= 0.8) {
      return 'progress-orange'; // Color naranjaelse
    } else {
      return 'progress-red'; // Color rojo
    }
  }

  setScore(score: number, type?: string): any {
    if ((type === 'verduras' || type === 'carnes') && score === 0) {
      this.max_vegetables = 10;
      this.max_meat = 11;
    }
    if (type === 'carnes' && score > 0) {
      return (this.max_meat = score);
    }
    if (type === 'verduras' && score > 0) {
      return (this.max_vegetables = score);
    }
  }

  setScoreWithZero(score: number) {
    if (score === 0) {
      return 1;
    } else {
      return score;
    }
  }

  getRresultReferentIcon(score: number, type: string): string {
    switch (type) {
      case 'scoreHidratacion':
        if (score <= 3) {
          return this.iconGreen;
        } else if (score >= 4 && score <= 6) {
          return this.iconYellow;
        } else if (score >= 7 && score <= 9) {
          return this.iconOrange;
        } else {
          return this.iconRed;
        }
      case 'scoreVerduras':
        if (score <= 3) {
          return this.iconGreen;
        } else if (score >= 4 && score <= 6) {
          return this.iconYellow;
        } else if (score >= 7 && score <= 8) {
          return this.iconOrange;
        } else {
          return this.iconRed;
        }
      case 'scoreFrutas':
        if (score <= 3) {
          return this.iconGreen;
        } else if (score >= 4 && score <= 6) {
          return this.iconYellow;
        } else if (score >= 7 && score <= 8) {
          return this.iconOrange;
        } else {
          return this.iconRed;
        }
      case 'scoreHidratos':
        if (score <= 2) {
          return this.iconGreen;
        } else if (score >= 3 && score <= 4) {
          return this.iconYellow;
        } else if (score >= 5 && score <= 8) {
          return this.iconOrange;
        } else {
          return this.iconRed;
        }
      case 'scoreSal':
        if (score <= 3) {
          return this.iconGreen;
        } else if (score >= 4 && score <= 5) {
          return this.iconYellow;
        } else if (score >= 6 && score <= 8) {
          return this.iconOrange;
        } else {
          return this.iconRed;
        }
      case 'scoreAzucar':
        if (score <= 3) {
          return this.iconGreen;
        } else if (score >= 4 && score <= 5) {
          return this.iconYellow;
        } else if (score >= 6 && score <= 7) {
          return this.iconOrange;
        } else {
          return this.iconRed;
        }
      case 'scoreOrigenAnimal':
        if (score <= 2) {
          return this.iconGreen;
        } else if (score >= 3 && score <= 5) {
          return this.iconYellow;
        } else if (score >= 6 && score <= 7) {
          return this.iconOrange;
        } else {
          return this.iconRed;
        }
      case 'scoreDerivados':
        if (score <= 1) {
          return this.iconGreen;
        } else if (score >= 2 && score <= 3) {
          return this.iconYellow;
        } else if (score >= 4 && score <= 5) {
          return this.iconOrange;
        } else {
          return this.iconRed;
        }
      case 'scoreUltraprocesados':
        if (score <= 2) {
          return this.iconGreen;
        } else if (score >= 3 && score <= 4) {
          return this.iconYellow;
        } else if (score === 5) {
          return this.iconOrange;
        } else {
          return this.iconRed;
        }
      case 'scorePreparacionDeComidas':
        if (score <= 2) {
          return this.iconGreen;
        } else if (score >= 3 && score <= 5) {
          return this.iconYellow;
        } else if (score >= 6 && score <= 7) {
          return this.iconOrange;
        } else {
          return this.iconRed;
        }
      default:
        return this.iconRed;
    }
  }

      getColorScore() {
        const score = this.resultNutrition?.totalScore ?? this.sessionlastPlan?.totalScore 
        if (score === undefined || score === null) {
            return '#F2F6FA'; // Default color if score is not available
        }
        if (score < 16) {
            return '#63e4a7';
        } else if (score >= 16 && score <= 30) {
            return '#b982de';
        } else if (score > 30 && score <= 60) {
            return '#fcd885';
        } else if (score > 60) {
            return '#ec6666';
        } else {
            return '#F2F6FA';
        }
    } 

  returnBack() {
    this.navCtrl.back();
  }

}
