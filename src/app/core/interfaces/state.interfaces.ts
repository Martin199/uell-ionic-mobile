import { User } from 'src/app/pages/tabs/interfaces/user-interfaces';
import { TenantConfig, TenantElement, UserResponseDTO } from './user';
import { TenantParameters } from './tenantParameters';

export interface UserState {
  userData: User | UserResponseDTO | null;
  tenantConfig: TenantConfig | null;
  tenantParameters: TenantParameters | null;
  tenant: TenantElement | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: ErrorLog | null;
  token: string | null;
  fcmToken: string | null;
}

export interface ErrorLog {
  message: string;
  component?: string;
  method?: string;
}

export interface ErrorExport extends ErrorLog {
  platafform: string; //Take from capacitor
  deviceId: string; //Take from capacitor
  userId: string; //Take from userState
}
