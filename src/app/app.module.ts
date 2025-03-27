import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { contentInterceptor } from './core/interceptors/content.interceptor';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from './services/storage.service';

export function initializeStorageFactory(storageService: StorageService) {
  return () => storageService.waitForInitialization();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ mode: 'md' }),
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeStorageFactory,
      deps: [StorageService],
      multi: true,
    },
    provideHttpClient(withInterceptors([authInterceptor, contentInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
