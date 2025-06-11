import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientService } from '../core/services/http-client.service';
import { Observable } from 'rxjs';
import { ResultPlanDTO } from '../pages/tabs/components/nutrition/my-result-nutrition/results.interface';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {

  httpClientService = inject (HttpClientService)

  constructor() { }

  getLastResultd(id: number) : Observable<ResultPlanDTO[]> {
    // return this.httpClientService.get(`${environment.apiBaseUrl}/nutrition-plan/getNutQuestionaryByUserId/${this._user.entity.currentId}?GET=LAST`);

    return this.httpClientService.get(`${environment.apiBaseUrl}${environment.apiVersion}/nutrition-plan/getNutQuestionaryByUserId/${id}?GET=LAST`);
  }
}
