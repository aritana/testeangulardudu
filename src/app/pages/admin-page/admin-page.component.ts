import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { AdminNavbarComponent } from '../../components/shared/admin-navbar/admin-navbar.component';
import { STORAGE_KEYS, StorageService } from '../../services/storage.service';
import { ROUTE_NAMES } from '../../app.routes';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [AdminNavbarComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

  constructor(
    private navigationService: NavigationService,
    private storageService: StorageService
  ) {
    if (!this.storageService.retrieveData(STORAGE_KEYS.isLoggedIn)
      && !this.storageService.retrieveData(STORAGE_KEYS.isAdmin)
    ) {
      this.navigateToPage(ROUTE_NAMES.login_page,'');
    }
  }

  navigateToPage(page: string, title: string): void {
    this.navigationService.navigateToPage(page, title);
  }
}
