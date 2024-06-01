import { Component } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private navigationService: NavigationService) {

  }

  navigateToPage(page: string, title: string) {
    this.navigationService.navigateToPage(page, title);
  }

  isAdmin() {
    return true;
  }
}
