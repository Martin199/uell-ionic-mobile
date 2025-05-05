import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { UserStateService } from '../core/state/user-state.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  private storage = inject(Storage);
  private _initPromise: Promise<void> | null = null;
  private userState = inject(UserStateService);

  constructor() {
    this._initPromise = this.initializeStorage();
  }

  saveToken() {
    const token = sessionStorage.getItem('accessToken');
    this.userState.setToken(token);
    this.setSessionStorage('accessToken', token);
  }

  async waitForInitialization(): Promise<void> {
    if (!this._initPromise) {
      this._initPromise = this.initializeStorage();
    }
    return this._initPromise;
  }

  async checkStorage() {
    if (!this._storage) return;
    const keys = await this._storage.keys();
    for (const key of keys) {
      let value = await this._storage.get(key);
      console.log('STORAGE KEY: ' + key + '  Value: ' + value);
    }
  }

  private async initializeStorage(): Promise<void> {
    try {
      const storage = await this.storage.create();
      this._storage = storage;

      if (this._storage) {
        const keys = await this._storage.keys();
        for (const key of keys) {
          let value = await this._storage.get(key);
          if (value !== null && value !== undefined) {
            if (typeof value === 'string') {
              sessionStorage.setItem(key, value);
            } else {
              sessionStorage.setItem(key, JSON.stringify(value));
            }
          }
        }
      }
    } catch (error) {
      console.error('Error initializing storage', error);
      throw error;
    }
  }

  // Métodos para localStorage
  setLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalStorage<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  removeLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }

  // metodos para session storage
  async setSessionStorage(key: string, value: any): Promise<void> {
    await this.waitForInitialization();
    const valueString =  typeof value === 'string' ? value : JSON.stringify(value);
    sessionStorage.setItem(key, valueString);

    if (this._storage) {
      await this._storage.set(`${key}`, value);
    }
  }

  getSessionStorage<T>(key: string): T | null {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  async removeSessionStorage(key: string): Promise<void> {
    await this.waitForInitialization();
    sessionStorage.removeItem(key);
    if (this._storage) {
      await this._storage.remove(`${key}`);
    }
  }

  async clearSessionStorage(): Promise<void> {
    await this.waitForInitialization();
    sessionStorage.clear();
    if (this._storage) {
      const keys = await this._storage.keys();
      for (const key of keys) {
        await this._storage.remove(key);
      }
    }
  }

  clearStorage(): void {
    this.clearLocalStorage();
    this.clearSessionStorage();
  }
}
