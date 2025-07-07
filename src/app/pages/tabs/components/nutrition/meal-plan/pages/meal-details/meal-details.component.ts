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
import { FileUploadComponent } from '../../../../../../../shared/componentes/file-upload/file-upload.component';
import { ImageClass } from 'src/app/services/interfaces/camera.interfaces';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonImg,
    CommonModule,
    FileUploadComponent,
  ],
})
export class MealDetailsComponent {
  private navCtrl = inject(NavController);

  private mealPlanService = inject(MealPlanService);

  card = computed(() => this.mealPlanService.selectedCard());
  fileSelected = computed(() => this.mealPlanService.fileSelected());

  postMarkDone() {
    const postMealCompliance: PostMealCompliance = {
      planId: this.mealPlanService.planId(),
      nutUserFoodId: this.mealPlanService.nutUserFoodId()!,
      uploadDate: new Date(),
      compliance: 'CUMPLIDO',
    };
    this.mealPlanService.postMealCompliance(postMealCompliance).subscribe(() => this.returnBack());
  }

  onFileUploaded(file: ImageClass | null) {
    this.mealPlanService.setFileSelected(file);
  }

  uploadPhoto() {
    if (!this.fileSelected()) return;
    const today = new Date();
    const postPhoto: PostMealCompliance = {
      planId: this.mealPlanService.planId(),
      nutUserFoodId: this.mealPlanService.nutUserFoodId()!,
      uploadDate: today,
      fileName: `${this.mealPlanService.nutUserFoodId()}_${today.toISOString().split('T')[0]}.jpg`,
      fileContent: this.fileSelected()!.imageUrl,
    };
    this.mealPlanService.postMealCompliance(postPhoto).subscribe(() => {});
  }

  returnBack() {
    this.mealPlanService.clearFileSelected();
    this.mealPlanService.clearCard();
    this.navCtrl.back();
  }
}
