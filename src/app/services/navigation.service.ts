import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  navigateToPage(page: string, title: string) {
    console.log(`Navigating to: ${page}`);
    console.log(`parameters: ${title}`);
    this.router.navigate([`/${page}`], { queryParams: { title } });
  }
}
