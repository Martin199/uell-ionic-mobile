import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UserState } from '../interfaces/state.interfaces';
import { TenantElement } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  // private _user = signal<UserResponseDTO | null>(null);
  private storageService = inject(StorageService);
  private state = signal<UserState>({
    isAuthenticated: false, //Todavia no se usa
    userData: null,
    tenantConfig: null, //De donde se levanta?
    tenantParameters: null,
    isLoading: false, //Todavia no se usa
    error: null, //Todavia no se usa
    token: null,
    fcmToken: null,
  });

  readonly isAuthenticated = computed(() => this.state().isAuthenticated);
  readonly userData = computed(() => this.state().userData);
  readonly userId = computed(() => this.state().userData?.id || null);
  readonly isLoading = computed(() => this.state().isLoading);
  readonly error = computed(() => this.state().error);
  readonly tenant = computed(() => this.state().userData?.tenant || null);
  readonly tenantConfig = computed(() => this.state().tenantConfig);
  readonly tenantParameters = computed(() => this.state().tenantParameters);
  readonly token = computed(() => this.state().token);
  readonly fcmToken = computed(() => this.state().fcmToken);
  // TODO Implementacion de appReady en appComponent para redireccion
  readonly appReady = computed(() => {
    if (
      this.userData() &&
      // this.tenantConfig() &&
      this.tenantParameters() &&
      this.token()
    )
      return true;
    return false;
  });

  constructor() {
    effect(() => {
      const currentState = this.state();
      this.storageService.setSessionStorage(
        'userState',
        JSON.stringify(currentState.userData)
      );
      //TODO: Se puede hacer un cleanUp de la app cuando el user sale de la autenticacion
      // if (currentState.isAuthenticated) { }
    });

    this.tryRestoreState();
  }

  //TODO: Manage login information in the state and call the method in the service
  login() {
    this.state.update((state) => ({
      ...state,
      isLoading: true,
      error: null,
    }));
  }

  logout() {
    this.state.update((state) => ({
      isAuthenticated: false,
      userData: null,
      tenantConfig: null,
      tenantParameters: null,
      isLoading: false,
      error: null,
      token: null,
      fcmToken: null,
    }));
    //TODO: Modificar el metodo que llama para que solo llame a este metodo
    this.storageService.clearStorage();
  }

  // getUserTenant(): UserState['tenant'] {
  //   return this.state().userData?.tenant.map((t) => t.id) ?? [];
  // }

  // Setters
  //Type is reference to the type of the object
  stateLoading(isLoading: UserState['isLoading']) {
    this.state.update((state) => ({
      ...state,
      isLoading,
    }));
  }

  setUser(userData: UserState['userData']) {
    this.state.update((state) => ({
      ...state,
      isAuthenticated: !!userData,
      userData,
      isLoading: false,
      error: null,
    }));
  }

  setError(message: string, component?: string, method?: string) {
    this.state.update((state) => ({
      ...state,
      error: { message, component, method },
      isLoading: false,
    }));
  }

  setToken() {
    const token: UserState['token'] = sessionStorage.getItem('accessToken');
    this.state.update((state) => ({
      ...state,
      token,
    }));
  }

  setFcmToken(token: UserState['fcmToken']) {
    this.state.update((state) => ({
      ...state,
      fcmToken: token,
    }));
  }

  setTenantConfig(tenantConfig: UserState['tenantConfig']) {
    this.state.update((state) => ({
      ...state,
      tenantConfig,
    }));
  }

  setTenantParameters(tenantParameters: UserState['tenantParameters']) {
    this.state.update((state) => ({
      ...state,
      tenantParameters,
    }));
  }

  setTenant(tenant: TenantElement[]) {
    // TODO: Implementacion correcta de selected tenant
    // this.state.update((state) => ({
    //   ...state,
    //   userData: state.userData
    //     ? {
    //         ...state.userData,
    //         tenant,
    //       }
    //     : null,
    // }));
  }

  // Try to recover the state from the storage
  private tryRestoreState() {
    const savedData = this.storageService.getSessionStorage('userState');
    if (savedData) {
      try {
        this.state.update((state) => ({
          ...state,
          isAuthenticated: true,
          savedData,
        }));
      } catch (e) {
        //If restore fails, remove the data from storage
        this.storageService.removeSessionStorage('userState');
      }
    }
  }
}
