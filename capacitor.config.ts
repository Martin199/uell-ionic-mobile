import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'uell-ionic-mobile',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
     //launchAutoHide: true,
      backgroundColor: "#A34C04",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: false,
      splashImmersive: false,
      layoutName: "launch_screen",
      useDialog: false,
    }
  }
};

export default config;
