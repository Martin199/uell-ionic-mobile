import { computed, inject, Injectable, signal } from '@angular/core';
import { UserStateService } from '../core/state/user-state.service';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { HttpClientService } from '../core/services/http-client.service';
import { PlanResponse, PostMealCompliance } from './interfaces/meal-plan.interface';
import { differenceInDays } from 'date-fns';
import { NutritionCard } from '../pages/tabs/components/nutrition/shared/nutrition-card/nutrition-card.interface';

@Injectable({
  providedIn: 'root',
})
export class MealPlanService {
  private http = inject(HttpClientService);

  private userState = inject(UserStateService);

  selectedCard = signal<NutritionCard | null>(null);
  planId = signal<number>(0);
  reloadMealPlan = signal<boolean>(true);
  nutUserFoodId = computed(() => this.selectedCard()?.mealPrepInfo?.nutUserFoodId);
  disabledValorarionPlan = false;

  getMealPlan(): Observable<PlanResponse> {
    const userId = this.userState.userId();
    const url = `${environment.apiBaseUrl}${environment.apiVersion}/nutrition-plan/getPlanByUserId/${userId}`;
    return this.http.get<PlanResponse>(url).pipe(
      map((response: PlanResponse) => {
        this.planId.set(response.planId);
        return response;
      })
    );
  }

  postMealCompliance(postMealCompliance: PostMealCompliance) {
    const data = {
      ...postMealCompliance,
      userId: this.userState.userId(),
    };
    const url = `${environment.apiBaseUrl}${environment.apiVersion}/meal-feedback/save`;
    return this.http.post(url, data);
  }

  enabledValorationPlan(date: string | null) {
    if (!date) {
      this.disabledValorarionPlan = false;
      return;
    }
    const currentDate = new Date();
    const expiretionDate = new Date(date);
    this.disabledValorarionPlan = differenceInDays(currentDate, expiretionDate) <= 0;
  }
}
