import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE_KEYS, StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private router: Router,
    private storageService: StorageService
  ) { }

  navigateToPage(page: string, title: string): void {
    console.log(`Navigating to: ${page}`);
    console.log(`parameters: ${title}`);

    const parts = title.split('|');
    if (parts.length > 1) {
      this.storageService.saveData({ key: STORAGE_KEYS.currentMediaId, value: parts[0] });
      this.storageService.saveData({ key: STORAGE_KEYS.currentMediaType, value: parts[1] });
    } else {
      this.storageService.saveData({ key: STORAGE_KEYS.currentMediaType, value: parts[0] });
    }

    this.storageService.saveData({ key: STORAGE_KEYS.currentPage, value: page });

    this.router.navigate([`/${page}`]).then(() => {
      window.location.reload();
    });;
  }
}
