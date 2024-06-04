import { Component } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private navigationService: NavigationService) {

  }

  navigateToPage(page: string, title: string): void  {
    this.navigationService.navigateToPage(page, title);
  }
}
