import { Injectable, computed, signal } from '@angular/core';
import { UserResponseDTO } from 'src/app/core/interfaces/user';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  private _user = signal<UserResponseDTO | null>(null);

  readonly user = computed(() => this._user());
  readonly isAuthenticated = computed(() => this._user() !== null);
  readonly hasMultipleTenants = computed(() => (this._user()?.tenant.length ?? 0) > 1);

  setUser(user: UserResponseDTO) {
    this._user.set(user);
  }

  clear() {
    this._user.set(null);
  }

  getUserFullName(): string {
    const user = this._user();
    return user ? `${user.name} ${user.surname}` : '';
  }

  getUserTenantIds(): number[] {
    return this._user()?.tenant.map(t => t.id) ?? [];
  }

  rehydrateFromStorage(storageService: StorageService) {
    const storedUser = storageService.getSessionStorage('user') as UserResponseDTO;
    if (storedUser) {
      this.setUser(storedUser);
    }
  }
}
