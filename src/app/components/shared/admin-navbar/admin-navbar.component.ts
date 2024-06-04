import { Component } from '@angular/core';
import { LogoutService } from '../../../services/logout.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {

  constructor(
    private logoutService: LogoutService
  ) {

  }

  logout(): void {
    this.logoutService.logout();
  }
}
