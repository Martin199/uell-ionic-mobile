import { DeviceId } from "@capacitor/device";

export interface ISession {
    userId: number;
    deviceId: string;
    active: boolean;
    tokenFirebase: string | undefined;
    appName: string;
    platform: string;
  }

  export interface Device {
    userId: string;
    deviceId: string;
    appName: string;
    active: boolean;
    tokenFirebase: string;
    versionCode: string | null;
  }
  
  export type DevicesResponse = Device[];
  