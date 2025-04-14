import { Component, inject } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { SessionServiceService } from './services/session-service.service';
import { Capacitor } from '@capacitor/core';
import { StorageService } from './services/storage.service';
import { UtilsService } from './services/utils.service';
import { UserResponseDTO } from './core/interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private sessionService = inject(SessionServiceService);
  private storageService = inject(StorageService);
  private utilsService = inject(UtilsService);

  constructor() {
    this.showSplash();
    this.initializeApp();
    if (Capacitor.isNativePlatform()) {
      this.initPush();
      StatusBar.setOverlaysWebView({ overlay: false });
    }
  }

  async initializeApp() {
    const user: UserResponseDTO | null =
      this.storageService.getSessionStorage('user');
    const accessToken = sessionStorage.getItem('accessToken');
    const tenant = this.storageService.getSessionStorage('tenant');
    const tenantParameters = this.storageService.getSessionStorage('tenantParameters');
    const termsAndConditions: Array<any> | null = this.storageService.getSessionStorage('termsAndConditions');
    if (user && accessToken && tenant && tenantParameters) {
      if (termsAndConditions && termsAndConditions.length > 0) this.utilsService.navCtrl.navigateRoot(['auth/term-and-conditions']);
      if (!user.onboarded)  this.utilsService.navCtrl.navigateRoot(['auth/onboarding']);
      this.utilsService.navCtrl.navigateRoot(['tabs/home']);
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
      this.sessionService.fcmToken = token;
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      // alert('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        // alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        // alert('Push action performed: ' + JSON.stringify(notification));
        const redirection = notification.notification.data.redirectTo;
        if (redirection) this.utilsService.navCtrl.navigateRoot(redirection);
      }
    );
  }

  async showSplash() {
    await SplashScreen.show({
      autoHide: true,
      showDuration: 3000,
    });
  }
}
