import { Component } from '@angular/core';
import { ContentSelectComponent } from './content-select/content-select.component';
import { NavigationService } from '../../services/navigation.service';
import { STORAGE_KEYS, StorageService } from '../../services/storage.service';
import { ROUTE_NAMES } from '../../app.routes';

@Component({
  selector: 'app-explore-page',
  standalone: true,
  imports: [ContentSelectComponent],
  templateUrl: './explore-page.component.html',
  styleUrl: './explore-page.component.css'
})
export class ExplorePageComponent {

  constructor(
    private navigationService: NavigationService,
    private storageService: StorageService
  ) {
    if(!this.storageService.retrieveData(STORAGE_KEYS.isLoggedIn)) {
      this.navigateToPage(ROUTE_NAMES.login_page,'');
    }
  }

  navigateToPage(page: string, title: string): void {
    this.navigationService.navigateToPage(page, title);
  }

}
