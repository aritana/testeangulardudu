import { Component } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {

  constructor(
    private navigationService: NavigationService,
    private storageService: StorageService
  ) {

  }

  navigateToPage(page: string, title: string) {
    this.navigationService.navigateToPage(page, title);
  }


  logout() {
    this.storageService.saveData('isAdmin', { value: false });
    this.navigateToPage('login-page', '');
  }

}
