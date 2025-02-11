import { Component, inject } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // platform = inject(Platform);
  private router = inject(Router);

  constructor(private platform: Platform) {
    this.showSplash();
    this.initPush();
  }

  initPush() {
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
<<<<<<< HEAD
    PushNotifications.requestPermissions().then((result: any) => {
=======
    PushNotifications.requestPermissions().then((result:any) => {
>>>>>>> 5e859d685772f6e4bd871b40cd3a50e39dadbf34
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: Token) => {
      alert('Push registration success 1234, token: ');
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        // alert('Push action performed: ' + JSON.stringify(notification));
        const redirection = notification.notification.data.redirectTo;
        if (redirection) this.router.navigateByUrl(redirection);
      }
    );
  }

  async showSplash() {
    await SplashScreen.show({
      autoHide: false,
      showDuration: 3000,
    });
  }
}
