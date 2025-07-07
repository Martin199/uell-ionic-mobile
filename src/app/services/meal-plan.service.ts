import { computed, inject, Injectable, signal, effect } from '@angular/core';
import { UserStateService } from '../core/state/user-state.service';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { HttpClientService } from '../core/services/http-client.service';
import { PlanResponse, PostMealCompliance, MealPlanState } from './interfaces/meal-plan.interface';
import { differenceInDays } from 'date-fns';
import { NutritionCard } from '../pages/tabs/components/nutrition/shared/nutrition-card/nutrition-card.interface';
import { StorageService } from './storage.service';
import { ImageClass } from './interfaces/camera.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MealPlanService {
  private http = inject(HttpClientService);
  private userState = inject(UserStateService);
  private storageService = inject(StorageService);

  private stateNull: MealPlanState = {
    selectedCard: null,
    planId: 0,
    reloadMealPlan: true,
    disabledValorarionPlan: false,
    isLoading: false,
    error: null,
    fileSelected: null,
  };

  private state = signal<MealPlanState>(this.stateNull);

  // Computed properties
  readonly selectedCard = computed(() => this.state().selectedCard);
  readonly planId = computed(() => this.state().planId);
  readonly reloadMealPlan = computed(() => this.state().reloadMealPlan);
  readonly disabledValorarionPlan = computed(() => this.state().disabledValorarionPlan);
  readonly isLoading = computed(() => this.state().isLoading);
  readonly error = computed(() => this.state().error);
  readonly nutUserFoodId = computed(() => this.selectedCard()?.mealPrepInfo?.nutUserFoodId);
  readonly fileSelected = computed(() => this.state().fileSelected);

  constructor() {
    // Set up effect to persist state changes
    effect(() => {
      const currentState = this.state();
      if (currentState !== this.stateNull) {
        this.storageService.setLocalStorage('mealPlanState', currentState);
      }
    });

    this.tryRestoreState();
  }

  // State setters
  setSelectedCard(selectedCard: NutritionCard | null) {
    this.state.update((state) => ({
      ...state,
      selectedCard,
    }));
  }

  setPlanId(planId: number) {
    this.state.update((state) => ({
      ...state,
      planId,
    }));
  }

  setReloadMealPlan(reloadMealPlan: boolean) {
    this.state.update((state) => ({
      ...state,
      reloadMealPlan,
    }));
  }

  setDisabledValorarionPlan(disabledValorarionPlan: boolean) {
    this.state.update((state) => ({
      ...state,
      disabledValorarionPlan,
    }));
  }

  setLoading(isLoading: boolean) {
    this.state.update((state) => ({
      ...state,
      isLoading,
    }));
  }

  setError(error: string | null) {
    this.state.update((state) => ({
      ...state,
      error,
    }));
  }

  setFileSelected(fileSelected: ImageClass | null) {
    this.state.update((state) => ({
      ...state,
      fileSelected,
    }));
  }

  clearState() {
    this.state.set({ ...this.stateNull });
    this.storageService.removeLocalStorage('mealPlanState');
  }

  clearCard() {
    this.setSelectedCard(null);
  }

  clearFileSelected() {
    this.setFileSelected(null);
  }

  // Try to recover the state from storage
  private tryRestoreState() {
    const savedData: MealPlanState | null = this.storageService.getLocalStorage('mealPlanState');
    if (savedData) {
      try {
        this.state.set({
          ...savedData,
        });
      } catch (error) {
        console.error('Error restoring meal plan state from storage:', error);
        this.clearState();
      }
    }
  }

  getMealPlan(): Observable<PlanResponse> {
    const userId = this.userState.userId();
    const url = `${environment.apiBaseUrl}${environment.apiVersion}/nutrition-plan/getPlanByUserId/${userId}`;
    return this.http.get<PlanResponse>(url).pipe(
      map((response: PlanResponse) => {
        this.setPlanId(response.planId);
        return response;
      })
    );
  }

  postMealCompliance(postMealCompliance: PostMealCompliance) {
    this.setLoading(true);
    this.setError(null);

    const data = {
      ...postMealCompliance,
      userId: this.userState.userId(),
    };
    const url = `${environment.apiBaseUrl}${environment.apiVersion}/meal-feedback/save`;

    return this.http.post(url, data).pipe(
      map((response) => {
        this.setLoading(false);
        return response;
      })
    );
  }

  enabledValorationPlan(date: string | null) {
    if (!date) {
      this.setDisabledValorarionPlan(false);
      return;
    }
    const currentDate = new Date();
    const expiretionDate = new Date(date);
    const isDisabled = differenceInDays(currentDate, expiretionDate) <= 0;
    this.setDisabledValorarionPlan(isDisabled);
  }
}
