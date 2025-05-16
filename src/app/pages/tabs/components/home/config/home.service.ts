import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { ISPSService } from 'src/app/services/isps.service';
import { User } from '../../../interfaces/user-interfaces';
import { PortalService } from 'src/app/services/portal.service';
import { ISPSScore } from 'src/app/pages/tabs/interfaces/isps';
import { MentalStatusService } from 'src/app/services/mental-status.service';
import { UserStateService } from 'src/app/core/state/user-state.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  ispsScore!: ISPSScore;
  storageService = inject(StorageService);
  ispsService = inject(ISPSService);
  portalService = inject(PortalService);
  http = inject(HttpClient);
  mentalStatusService = inject(MentalStatusService);
  private userState = inject(UserStateService);

  currentDate: Date = new Date();
  currentYear: number;
  currentMonth: number;

  constructor() {
    
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth() + 1;
  }

  callModuleMethod(moduleName: string): Observable<any> {
    const userId = this.userState.userId();
    if (!userId) {
      console.error('No se puede obtener el id del usuario');
      return of(null);
    }
    const generalParameters: any =
      this.storageService.getSessionStorage('tenantParameters');
    const modulesActive = generalParameters.tenantParameters.activeModules.find(
      (module: any) => module === moduleName
    );
    switch (modulesActive) {
      case 'isps':
        return this.ispsService.getISPSScore(userId);
      case 'wellness':
        return this.portalService.getLastPostPortal();
      // case 'hc_onboarding':
      //   return this.http.put(endpoint, payload);
      // case 'hc_user':
      //   return this.http.delete(endpoint);
      case 'emotional':
        return this.mentalStatusService.getMentalStatus(userId);
      // case 'emotion_map':
      //   return this.mentalStatusService.getEmotionalMap( this.user.id, this.currentYear, this.currentMonth);
      // case 'profile':
      //   return this.http.delete(endpoint);
      // case 'ausentismo':
      //   return this.http.delete(endpoint);
      // case 'training':
      //   return this.http.delete(endpoint);
      // case 'nutrition':
      //   return this.http.delete(endpoint);
      default:
        return of(null);
    }
  }

  callAllMethodsForModule(): Observable<any[]> {
    const generalParameters: any =
      this.storageService.getSessionStorage('tenantParameters');
    const activeModules =
      generalParameters?.tenantParameters?.activeModules || [];

    if (activeModules.length === 0) {
      console.warn('No hay módulos activos configurados.');
      return of([]);
    }

    const observables = activeModules.map((moduleName: string) =>
      this.callModuleMethod(moduleName).pipe(
        map((response: any) => ({
          moduleName,
          body: response,
        })),
        catchError((error) => {
          console.error(`Error en el módulo ${moduleName}:`, error);
          return of({ moduleName, error });
        })
      )
    );

    return forkJoin(observables).pipe(
      map((results: any) =>
        results.filter((result: any) => result.body !== null || result.error)
      )
    );
  }
}
