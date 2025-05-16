import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, RouteReuseStrategy } from '@angular/router';

import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { contentInterceptor } from './core/interceptors/content.interceptor';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from './services/storage.service';
import {
  provideIonicAngular,
  IonicRouteStrategy,
} from '@ionic/angular/standalone';
import { routes } from './app-routing.module';

export function initializeStorageFactory(storageService: StorageService) {
  return () => storageService.waitForInitialization();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    IonApp,
    IonRouterOutlet,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideAppInitializer(() => {
      const initializerFn = initializeStorageFactory(inject(StorageService));
      return initializerFn();
    }),
    provideHttpClient(withInterceptors([authInterceptor, contentInterceptor])),
    provideIonicAngular({ mode: 'md' }),
    provideRouter(routes),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
