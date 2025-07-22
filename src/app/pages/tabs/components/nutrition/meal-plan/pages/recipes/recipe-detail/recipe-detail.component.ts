import { Component, OnInit, OnDestroy, computed, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { NutritionCard } from '../../../../shared/nutrition-card/nutrition-card.interface';
//import { ModalRatingComponent } from '../modal-rating/modal-rating.component';
import { MealPlanService } from 'src/app/services/meal-plan.service';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonImg, IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackSharp, ellipse, heartOutline, timeOutline, people, starOutline, bulb, heart } from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { StarsRateComponent } from '../../../../shared/stars-rate/stars-rate.component';

addIcons({
  arrowBackSharp,
  ellipse,
  heartOutline,
  timeOutline,
  people,
  starOutline,
  heart
});

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonImg, IonContent, StarsRateComponent],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private mealPlanService = inject(MealPlanService);
  private modalCtrl = inject(ModalController);
  private navCtrl = inject(NavController);

  recipeCard: NutritionCard | null | undefined = undefined;
  rating = 0;

  ngOnInit() {
    this.getRecipe();
  }

  ngOnDestroy() {
    localStorage.removeItem('recipeDetail');
  }

  getRecipe() {
    const currentNavigation = this.router.getCurrentNavigation()?.extras.state;
    const localRecipe = localStorage.getItem('recipeDetail');

    if (currentNavigation) {
      this.recipeCard = currentNavigation['recipeDetail'];
    } else if (localRecipe) {
      this.recipeCard = JSON.parse(localRecipe);
    }
    this.rating = this.recipeCard?.recipeInfo?.user_valoration ?? 0;
    localStorage.setItem('recipeDetail', JSON.stringify(this.recipeCard));
  }

  favRecipe(fav: boolean) {
    if (!this.recipeCard?.recipeInfo) return;
    this.recipeCard.recipeInfo.fav = fav;
    this.mealPlanService.postFavoriteRecipe(this.recipeCard.recipeInfo.id, fav).subscribe({
      next: () => {},
      error: (err: any) => {
        console.error('error en post fav recipe', err);
      },
    });
  }

  async openRatingModal() {
    if (!this.recipeCard) return;
    //const modal = await this.modalCtrl.create({
    //  component: ModalRatingComponent,
    //  componentProps: { title: this.recipeCard.title, recipeId: this.recipeCard.recipeInfo.id },
    //});

    //await modal.present();

    //const { data } = await modal.onWillDismiss();
    //if (data) {
    //  this.rating = data.rate;
    //}
  }

  returnBack() {
    if (!this.recipeCard) return;
    this.navCtrl.back();
  }
}
