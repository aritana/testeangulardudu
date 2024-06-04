import { Injectable } from '@angular/core';
import { STORAGE_KEYS, StorageService } from './storage.service';
import { NavigationService } from './navigation.service';
import { ROUTE_NAMES } from '../app.routes';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private storageService: StorageService,
    private navigationService: NavigationService
  ) { }

  logout(): void {
    this.storageService.saveData({ key: STORAGE_KEYS.isAdmin, value: false });
    this.storageService.saveData({ key: STORAGE_KEYS.isLoggedIn, value: false });
    this.navigationService.navigateToPage(ROUTE_NAMES.login_page, '');
  }
}
