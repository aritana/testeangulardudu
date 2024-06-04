import { Injectable } from '@angular/core';
import { ROUTE_NAMES } from '../app.routes';

export type StorageValueTypes = string | boolean | number | typeof ROUTE_NAMES;

export type StorageKeyType = {
  key: STORAGE_KEYS;
  value: StorageValueTypes;
}

export enum STORAGE_KEYS {
  isAdmin,
  isLoggedIn,
  currentMediaType,
  currentMediaId,
  currentPage,
  username,
  name,
  isInLibrary,
  email
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private STORAGE_KEYS_VALUES: StorageKeyType[] = [
    { key: STORAGE_KEYS.isAdmin, value: false },
    { key: STORAGE_KEYS.isLoggedIn, value: false},
    { key: STORAGE_KEYS.currentMediaType, value: 'Filme'},
    { key: STORAGE_KEYS.currentMediaId, value: 0},
    { key: STORAGE_KEYS.username, value: 'noUsername'},
    { key: STORAGE_KEYS.name, value: 'noName'},
    { key: STORAGE_KEYS.email, value: 'email@email.com'},
    { key: STORAGE_KEYS.currentPage, value: ROUTE_NAMES.main_page},
    { key: STORAGE_KEYS.isInLibrary, value: false}
  ];

  keyExists(key: STORAGE_KEYS): StorageKeyType {
    const exists = this.STORAGE_KEYS_VALUES.find(item => item.key === key);
    if (!exists) throw new Error('Key not defined');
    return exists;
  }

  saveData(keyValue: StorageKeyType): void {
    const { key, value } = keyValue;
    this.keyExists(key);
    localStorage.setItem(key.toString(), JSON.stringify(value));
  }

  retrieveData(key: STORAGE_KEYS): StorageValueTypes {
    const saveAndReturnDefaultValue = (): StorageValueTypes => {
      localStorage.setItem(key.toString(), JSON.stringify(value));
      return value;
    };

    const value = this.keyExists(key).value;
    const savedData = localStorage.getItem(key.toString());
    return savedData
      ? JSON.parse(savedData)
      : saveAndReturnDefaultValue();
  }
}
