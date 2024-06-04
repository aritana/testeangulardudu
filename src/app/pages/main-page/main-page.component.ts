import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  constructor(private navigationService: NavigationService) {}

  navigateToPage(page: string, title: string): void {
    this.navigationService.navigateToPage(page, title);
  }
}
