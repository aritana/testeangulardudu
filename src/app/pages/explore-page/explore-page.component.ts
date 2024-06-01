import { Component } from '@angular/core';
import { ContentSelectComponent } from './content-select/content-select.component';
import { NavigationService } from '../../services/navigation.service';
import { StorageService } from '../../services/storage.service';

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
    if(!this.storageService.retrieveData('isAdmin').value) {
      this.navigateToPage('login-page','');
    }
  }

  navigateToPage(page: string, title: string) {
    this.navigationService.navigateToPage(page, title);
  }

}
