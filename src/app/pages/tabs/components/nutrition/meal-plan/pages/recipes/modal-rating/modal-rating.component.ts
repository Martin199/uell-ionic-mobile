import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input } from '@angular/core';
import { IonButton, IonButtons, IonHeader, IonIcon, IonToolbar, ModalController, IonTextarea} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { MealPlanService } from 'src/app/services/meal-plan.service';
import { StarsRateComponent } from '../../../../shared/stars-rate/stars-rate.component';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

addIcons({
  close
});

@Component({
  selector: 'app-modal-rating',
  templateUrl: './modal-rating.component.html',
  styleUrls: ['./modal-rating.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, FormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTextarea,
    IonIcon, StarsRateComponent],
})
export class ModalRatingComponent {
  @Input() title: string = '';
  @Input() recipeId: number = -1;
  comments: string = '';
  rate: number = -1;
  disable: boolean = true;

  constructor(private mealPlanService: MealPlanService) {}


  private modalCtrl = inject(ModalController);

  setRate(rate: number) {
    this.rate = rate;
    this.disable = false;
  }

  save() {
    this.mealPlanService.postValorationRecipe(this.recipeId, this.rate, this.comments).subscribe({
      next: (res: any) => {
        this.dismissModal(true);
      },
    });
  }

  dismissModal(close?: boolean) {
    close
      ? this.modalCtrl.dismiss({
          rate: this.rate,
        })
      : this.modalCtrl.dismiss();
  }
}
