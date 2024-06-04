import { Component, Input, OnInit } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-content-select',
  standalone: true,
  imports: [],
  templateUrl: './content-select.component.html',
  styleUrl: './content-select.component.css'
})
export class ContentSelectComponent implements OnInit {
  imageSrc: string;
  navPage: string;

  @Input() title: string;

  constructor(private navigationService: NavigationService) {
    this.title = '';
    this.imageSrc = '';
    this.navPage = '';
  }

  navigateToPage(page: string, title: string): void {
    this.navigationService.navigateToPage(page, title);
  }

  ngOnInit(): void {
    switch (this.title) {
    case 'filmes':
      this.imageSrc = '../../../../assets/images/filmes-catalogo.jpg';
      this.navPage = 'list-content';
      break;
    case 'series':
      this.imageSrc = '../../../../assets/images/filmes-catalogo.jpg';
      this.navPage = 'list-content';
      break;
    case 'livros':
      this.imageSrc = '../../../../assets/images/filmes-catalogo.jpg';
      this.navPage = 'list-content';
      break;
    default:
      this.imageSrc = '../../../../assets/images/filmes-catalogo.jpg';
      this.navPage = 'list-content';
      break;
    }
  }
}
