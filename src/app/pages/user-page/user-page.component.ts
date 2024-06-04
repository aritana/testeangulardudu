import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { LogoutService } from '../../services/logout.service';
import { STORAGE_KEYS, StorageService, StorageValueTypes } from '../../services/storage.service';
import { ComentsContentComponent } from '../details-page/coments-content/coments-content.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    ComentsContentComponent,
    CommonModule
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit {

  username: StorageValueTypes;
  name: StorageValueTypes;
  email: StorageValueTypes;
  imageUrl: string;

  constructor(
    private navigationService: NavigationService,
    private storageService: StorageService,
    private logoutService: LogoutService
  ) {
    this.username = '';
    this.name = '';
    this.email = '';
    this.imageUrl = '../../../assets/images/blank-profile.png';
  }

  ngOnInit(): void {
    this.imageUrl = '../../../assets/images/blank-profile.png';
    this.username = this.storageService.retrieveData(STORAGE_KEYS.username);
    this.name = this.storageService.retrieveData(STORAGE_KEYS.name);
    this.email = this.storageService.retrieveData(STORAGE_KEYS.email);
  }

  navigateToPage(page: string, title: string): void {
    this.navigationService.navigateToPage(page, title);
  }

  logout(): void {
    this.logoutService.logout();
  }
}
