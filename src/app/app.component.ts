import { Component, inject } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { UtilsService } from './services/utils.service';
import { UserStateService } from './core/state/user-state.service';
import { addIcons } from 'ionicons';
import { alertCircle, arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  private userStateService = inject(UserStateService);
  private utilsService = inject(UtilsService);

  constructor() {
    this.showSplash();
    this.initializeApp();
    if (Capacitor.isNativePlatform()) {
      this.initPush();
    }
    addIcons({ arrowBackOutline, alertCircle });
  }

  async initializeApp() {
    // TODO: Buscar terminos y condiciones
    // const tC: Array<any> | null = this.storageService.getSessionStorage('termsAndConditions');
    if (this.userStateService.appReady()) {
      // if (tC && tC.length > 0) this.utilsService.navCtrl.navigateRoot(['auth/term-and-conditions']);
      if (!this.userStateService.userData()?.onboarded) {
        this.utilsService.navCtrl.navigateRoot(['auth']);
        return;
      }

      const currentUrl = window.location.pathname;
      const isOnValidRoute = currentUrl.includes('/tabs/') && currentUrl !== '/tabs';

      if (!isOnValidRoute) {
        this.utilsService.navCtrl.navigateRoot(['tabs/home']);
      }
    }
  }

  initPush() {
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then((result: any) => {
      // alert('req permision push: ' + result.receive);
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: Token) => {
      // alert('Push registration success, token: ' + token.value);
      this.userStateService.setFcmToken(token.value);
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('Error on registration:', error);
      // alert('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      console.log('pushNotificationReceived')
      // alert('Push received: ' + JSON.stringify(notification));
    });

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      // alert('Push action performed: ' + JSON.stringify(notification));
      console.log('pushNotificationActionPerformed')
      const redirection = notification.notification.data.redirectTo;
      if (redirection) this.utilsService.navCtrl.navigateRoot(redirection);
    });
  }

  async showSplash() {
    await SplashScreen.show({
      autoHide: true,
      showDuration: 3000,
    });
  }
}
