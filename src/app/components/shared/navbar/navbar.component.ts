import { Component } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { CommonModule } from '@angular/common';
import { STORAGE_KEYS, StorageService, StorageValueTypes } from '../../../services/storage.service';
import { ROUTE_NAMES } from '../../../app.routes';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isAdmin: StorageValueTypes;
  isLoggedIn: StorageValueTypes;

  ROUTE_NAMES = ROUTE_NAMES;

  constructor(
    private navigationService: NavigationService,
    private storageService: StorageService
  ) {
    this.isAdmin = this.storageService.retrieveData(STORAGE_KEYS.isAdmin);
    this.isLoggedIn = this.storageService.retrieveData(STORAGE_KEYS.isLoggedIn);
  }

  navigateToPage(page: string, title: string): void {
    this.navigationService.navigateToPage(page, title);
  }
}
