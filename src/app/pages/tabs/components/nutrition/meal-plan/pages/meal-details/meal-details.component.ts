import { Component, computed, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonImg,
  NavController,
  IonContent,
} from '@ionic/angular/standalone';
import { MealPlanService } from 'src/app/services/meal-plan.service';
import { CommonModule } from '@angular/common';
import { PostMealCompliance } from 'src/app/services/interfaces/meal-plan.interface';
import { FileUploadComponent } from '../../../../../../../shared/componentes/file-upload/file-upload.component';
import { ImageClass } from 'src/app/services/interfaces/camera.interfaces';
import { UtilsService } from 'src/app/services/utils.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { alertCircle, arrowBackOutline, arrowBackCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonImg, CommonModule, FileUploadComponent, IonContent],
})
export class MealDetailsComponent {
  private navCtrl = inject(NavController);
  private utilsService = inject(UtilsService);
  private mealPlanService = inject(MealPlanService);
  private router = inject(Router);

  private mealPost: PostMealCompliance = {
    planId: this.mealPlanService.planId(),
    nutUserFoodId: this.mealPlanService.nutUserFoodId()!,
    uploadDate: new Date(),
    compliance: 'CUMPLIDO',
  };

  constructor() {
    addIcons({
      arrowBackCircleOutline,
    });
  }

  card = computed(() => this.mealPlanService.selectedCard());
  fileSelected = computed(() => this.mealPlanService.fileSelected());

  postMarkDone() {
    this.mealPlanService.postMealCompliance(this.mealPost).subscribe(() => {
      this.returnBack();
      this.mealPlanService.triggerReload.update(value => !value);
      this.utilsService.presentWinToast(1)
    });
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

  navigateToRecipe(recipeId: any) {
    this.mealPlanService
      .getRecipeById(recipeId)
      .pipe(
        map((recipeArray: any) => {
          const recipe = recipeArray[0];
          const steps = this.parseSteps(recipe.cook_steps);
          let card = {
            title: recipe.title,
            description: '',
            navigateTo: 'meal-detail',
            image: recipe.url,
            recipeInfo: {
              id: recipe.id,
              cook_time: recipe.cook_time,
              portions: recipe.portions,
              cook_steps: steps,
              nutrition_tips: recipe.nutrition_tips ? recipe.nutrition_tips : '',
              fav: recipe.is_favorite,
              ingredients: this.parseIngridients(recipe.description),
              valoration: recipe.valoration,
              user_valoration: recipe.user_valoration,
            },
          };
          return { ...card };
        })
      )
      .subscribe({
        next: (recipe) => {
          this.router.navigate(['tabs/nutrition/recipe-detail'], {
            state: { recipeDetail: recipe },
          });
        },
      });
  }

  parseSteps(text: string): string[] {
    const steps = text
      .split(/\d+\.\s?/)
      .filter((step) => step)
      .map((step) => step.replace(/;/g, '').trim());
    return steps;
  }

  parseIngridients(description: string): any[] {
    return description.split(';').map((ingredient) => {
      const parts = ingredient.split('/');
      return { amount: parts[0].trim(), name: parts[1].trim() };
    });
  }

}
