import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {

  constructor(private navigationService: NavigationService) {

  }

  navigateToPage(page: string, title: string) {
    this.navigationService.navigateToPage(page, title);
  }
}
