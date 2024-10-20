import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  // Get data from localStorage
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  // Remove data from localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all data from localStorage
  clear(): void {
    localStorage.clear();
  }
}
