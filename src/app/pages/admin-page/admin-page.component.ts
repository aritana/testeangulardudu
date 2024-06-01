import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { AdminNavbarComponent } from '../../components/shared/admin-navbar/admin-navbar.component';
import { StorageService } from '../../services/storage.service';

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
    if(!this.storageService.retrieveData('isAdmin').value) {
      this.navigateToPage('login-page','');
    }
  }

  navigateToPage(page: string, title: string) {
    this.navigationService.navigateToPage(page, title);
  }
}
