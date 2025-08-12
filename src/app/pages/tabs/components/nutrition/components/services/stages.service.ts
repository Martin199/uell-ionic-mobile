import { inject, Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StagesService {

  userStateService = inject(UserStateService)
  http = inject(HttpClientService)

  constructor() { }

  getPreferencesRestrictions() {
    const url = `${environment.apiBaseUrl}${environment.apiVersion}/preferences-restrictions/getAll`;
    return this.http.get(url)
  }

  postNutritionPlan(body: any, stagesPreference?: any) {
    const bodyPost = {
      "userId": this.userStateService.userId(),
      "drinksWater": this.waterPlanFormat(body?.firstQuestionStep1, body?.secondQuestionStep1),
      "thirsty": body?.thirdQuestionStep1 === null ? "FALSE" : body?.thirdQuestionStep1,
      "vegetables": this.mealPlanFormat(body?.firstQuestionStep2,body?.secondQuestionStep2),
      "vegetablesPerDay": body?.thirdQuestionStep2 ? body.thirdQuestionStep2 : "NULL",
      "fruit": this.mealPlanFormat(body?.firstQuestionStep3,body?.secondQuestionStep3),
      "fruitsPerDay": body?.thirdQuestionStep3 ? body.thirdQuestionStep3: "NULL",
      "carbohydrates": body?.firstQuestionStep4,
      "bread": body?.secondQuestionStep4 === "NO_BREAD" ? "NO_BREAD" : body?.thirdQuestionStep4,
      "salt": body?.firstQuestionStep5 === "TRUE" ? body?.secondQuestionStep5 : body?.firstQuestionStep5,
      "snacks":  !body?.thirdQuestionStep5 ? "NO_SNACKS" : body?.thirdQuestionStep5,
      "cookiesSodaJuice": body?.firstQuestionStep6,
      "sugarSpoons": body?.secondQuestionStep6 === "NO_SUGAR" ? "NO_SUGAR" : body?.thirdQuestionStep6,
      "readMeat": body?.secondQuestionStep7.find((x:any) => x === "Carne roja") && body.secondQuestionStep7.length > 0 ? body?.thirdQuestionStep7 : "NO_CONSUME",
      "chicken": body?.secondQuestionStep7.find((x:any) => x === "Pollo") && body.secondQuestionStep7.length > 0 ? body?.fourQuestionStep7: "NO_CONSUME",
      "fish": body?.secondQuestionStep7.find((x:any) => x === "Pescado") && body.secondQuestionStep7.length > 0 ? body?.fiveQuestionStep7: "NO_CONSUME",
      "dairy": body?.firstQuestionStep8,
      "eggs": body?.secondQuestionStep8,
      "sausages": body?.firstQuestionStep9 === "NO_SAUSAGES" ? "NO_SAUSAGES": body?.secondQuestionStep9 ,
      "dressings": body?.thirdQuestionStep9,
      "mealPreparation": body?.firstQuestionStep10,                             
      "oil":  body?.secondQuestionStep10,
      "breakfasts": body?.thirdQuestionStep10,                                           
      "objetives": stagesPreference?.firstQuestionStep1,
      "dietPreferences": stagesPreference?.firstQuestionStep2,
      "alcohol": stagesPreference?.firstQuestionStep3.firstQuestionStep3 === "Si" ? stagesPreference?.firstQuestionStep3.secondQuestionStep3 : stagesPreference?.firstQuestionStep3.firstQuestionStep3,
      "otherAlergiesRestriction": stagesPreference?.firstQuestionStep4?.thirdQuestionStep4 ?  stagesPreference?.firstQuestionStep4?.thirdQuestionStep4 : "",
      "restrictionList": Array.from(new Set( stagesPreference?.firstQuestionStep3?.thirdQuestionStep3)),
      "preferenceList": [],
      "kitchenUtilList": stagesPreference?.firstQuestionStep5?.firstQuestionStep5,
      
    }

    // Limpiar campos vacíos del objetost = this.removeEmptyFields(bodyPost);
   
    const url = `${environment.apiBaseUrl}${environment.apiVersion}/nutrition-plan/save-questionary`;

    return this.http.post(url, bodyPost)

  }

  /**
   * Elimina campos vacíos, null, undefined o arrays vacíos de un objeto
   */
  private removeEmptyFields(obj: any): any {
    const cleaned: any = {};
    
    for (const [key, value] of Object.entries(obj)) {
      // Verificar si el valor no está vacío
      if (value !== null && value !== undefined && value !== "") {
        // Si es un array, verificar que no esté vacío
        if (Array.isArray(value)) {
          if (value.length > 0) {
            cleaned[key] = value;
          }
        } else {
          cleaned[key] = value;
        }
      }
    }
    
    return cleaned;
  }

  mealPlanFormat(firstStepValue?: string, secondStepValue?: string) {

    if (firstStepValue === 'TRUE') {
      return secondStepValue
    } else if(firstStepValue === 'NO_CONSUME'){
      return firstStepValue
    } else return
  }

  waterPlanFormat(firstStepValue?: string, secondStepValue?: string) {

    if (firstStepValue === 'TRUE') {
      return secondStepValue
    } else if(firstStepValue === 'NO_WATER'){
      return firstStepValue
    } else if(firstStepValue !== 'TRUE' && firstStepValue !== 'NO_WATER'){
      return firstStepValue
    } else return
  }
}

