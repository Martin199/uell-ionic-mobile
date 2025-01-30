import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { ISPSService } from 'src/app/services/isps.service';
import { User } from '../../../interfaces/user-interfaces';
import { PortalService } from 'src/app/services/portal.service';
import { ISPSScore } from 'src/app/pages/tabs/interfaces/isps';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  user: User;
  ispsScore! : ISPSScore;
  storageService = inject(StorageService);
  ispsService = inject(ISPSService);
  portalService = inject (PortalService)
  http = inject(HttpClient);

  constructor() {
    this.user = this.storageService.getSessionStorage<User>('user') !;
  }


  callModuleMethod(moduleName: string): Observable<any> {
    const generalParameters: any = this.storageService.getSessionStorage('tenantParameters')

    const modulesActive = generalParameters.tenantParameters.activeModules.find((module: any) => module === moduleName);

    switch (modulesActive) {
      case 'isps':
         return this.ispsService.getISPSScore(this.user.id);
      case 'wellness':
        return  this.portalService.getLastPostPortal();
      // case 'hc_onboarding':
      //   return this.http.put(endpoint, payload);
      // case 'hc_user':
      //   return this.http.delete(endpoint);
      // case 'emotional':
      //   return this.http.delete(endpoint);
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
    const generalParameters: any = this.storageService.getSessionStorage('tenantParameters');
    const activeModules = generalParameters?.tenantParameters?.activeModules || [];
  
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
        catchError(error => {
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
