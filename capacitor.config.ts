import type { CapacitorConfig } from '@capacitor/cli';
/// <reference types="@mindly/capacitor-android-edge-to-edge-support" />
const config: CapacitorConfig = {
  appId: 'com.uell.ionic.mobile',
  appName: 'uell',
  webDir: 'www/browser',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      backgroundColor: '#1DA4B1',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#999999',
      splashFullScreen: false,
      splashImmersive: false,
      layoutName: 'launch_screen',
      useDialog: false,
    },
    StatusBar: {
      overlaysWebView: false,
      style: 'DARK',
      backgroundColor: '#000000',
    },
    EdgeToEdge: {
      backgroundColor: '#ffffff',
    },
  },
};

export default config;
