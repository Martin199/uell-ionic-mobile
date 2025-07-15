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
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonImg, CommonModule, FileUploadComponent],
})
export class MealDetailsComponent {
  private navCtrl = inject(NavController);
  private utilsService = inject(UtilsService);
  private mealPlanService = inject(MealPlanService);

  private mealPost: PostMealCompliance = {
    planId: this.mealPlanService.planId(),
    nutUserFoodId: this.mealPlanService.nutUserFoodId()!,
    uploadDate: new Date(),
    compliance: 'CUMPLIDO',
  };

  card = computed(() => this.mealPlanService.selectedCard());
  fileSelected = computed(() => this.mealPlanService.fileSelected());

  postMarkDone() {
    this.mealPlanService.postMealCompliance(this.mealPost).subscribe(() => this.returnBack());
  }

  onFileUploaded(file: ImageClass | null) {
    if (file) {
      const allowedTypes = ['.jpg', '.jpeg', '.png', '.pdf'];
      const fileExtension = `.${file.format.toLowerCase()}`;
      const isAllowed = allowedTypes.includes(fileExtension);

      if (!isAllowed) {
        this.utilsService.customToast('bottom', 5000, 'Tipo de archivo no permitido', 'danger-icon', 'alert-circle');
        return;
      }
    }

    this.mealPlanService.setFileSelected(file);
  }

  uploadPhoto() {
    if (!this.fileSelected()) return;
    const today = new Date();
    this.mealPost.fileName = `${this.mealPlanService.nutUserFoodId()}_${today.toISOString().split('T')[0]}`;
    this.mealPost.fileContent = this.fileSelected()!.imageUrl;
    this.mealPost.uploadDate = today;
    this.mealPlanService.postMealCompliance(this.mealPost).subscribe(() => {});
  }

  returnBack() {
    this.mealPlanService.clearFileSelected();
    this.mealPlanService.clearCard();
    this.navCtrl.back();
  }
}
