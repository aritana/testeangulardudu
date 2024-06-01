import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {

  constructor(private navigationService: NavigationService) {

  }

  navigateToPage(page: string, title: string) {
    this.navigationService.navigateToPage(page, title);
  }
}
