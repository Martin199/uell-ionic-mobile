import { Component, Input, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { MealPlanService } from 'src/app/services/meal-plan.service';
import { UtilsService } from 'src/app/services/utils.service';
import { IRateMealPlanPayload } from './rate-meal-plan.interfaces';
import { StarsRateComponent } from '../../../shared/stars-rate/stars-rate.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonHeader, IonIcon, IonToolbar, IonTextarea, IonContent, IonGrid, IonRow, IonCol, IonTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

addIcons({
  close
});

@Component({
  selector: 'app-modal-rate-meal-plan',
  templateUrl: './modal-rate-meal-plan.component.html',
  styleUrls: ['./modal-rate-meal-plan.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTextarea,
    IonIcon,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonTitle,
    StarsRateComponent
  ],
})
export class ModalRateMealPlanComponent implements OnInit {

  @Input() data!: IRateMealPlanPayload;
  comment: string = '';
  valoration: number = 0;
  disable: boolean = true;

  private modalCtrl = inject(ModalController);
  private mealPlanService = inject(MealPlanService);
  private utilsService = inject(UtilsService);

  constructor() { }

  ngOnInit(): void {}

  changeCurrentRate(rate: number) {
    this.valoration = rate;
    this.disable = false;
  }

  sendRateMealPlan() {
    const body: IRateMealPlanPayload = {
      nutUserPlanId: this.data.nutUserPlanId,
      valoration: this.valoration,
      comment: this.comment,
    };
    
    this.mealPlanService.postNutritionPlanFeedback(body).subscribe({
      next: () => {
        this.closeModal(true);
      },
      error: (err) => {
        console.error(err);
        this.utilsService.getToastMessage('bottom', 3000, 'Error al enviar la valoración');
        this.closeModal();
      }
    });
  }

  closeModal(data?: boolean) {
    data ? this.modalCtrl.dismiss(true) : this.modalCtrl.dismiss();
  }
}
