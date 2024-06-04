import { Injectable } from '@angular/core';
import { NavigationService } from './navigation.service';
import { STORAGE_KEYS, StorageService } from './storage.service';
import { ROUTE_NAMES } from '../app.routes';
import { LendopsService } from './lendops.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private storageService: StorageService,
    private navigationService: NavigationService,
    private lendopService: LendopsService
  ) { }


  navigateToPage(page: string, title: string): void {
    this.navigationService.navigateToPage(page, title);
  }

  login(accountData: any): string {
    const defaultLogin = (): string => {
      const { username, password } = accountData;

      if (username === 'admin' && password === 'admin') {
        this.storageService.saveData({key: STORAGE_KEYS.isAdmin, value: true });
        this.storageService.saveData({key: STORAGE_KEYS.isLoggedIn, value: true });
        this.storageService.saveData({key: STORAGE_KEYS.username, value: 'admin' });
        this.navigateToPage(ROUTE_NAMES.admin_page, '');
        return 'Logado com sucesso';
      } else {
        if (username === 'user' && password === 'user') {
          this.storageService.saveData({key: STORAGE_KEYS.isAdmin, value: false });
          this.storageService.saveData({key: STORAGE_KEYS.isLoggedIn, value: true });
          this.storageService.saveData({key: STORAGE_KEYS.username, value: 'user' });
          this.navigateToPage(ROUTE_NAMES.explore_page, '');
          return 'Logado com sucesso';
        } else {
          return 'Credenciais inválidas. Tente novamente.';
        }
      }
    };

    const message: string[] = [];
    this.lendopService.loginUser(accountData).subscribe({
      next: account => {
        console.log('Usuário logado com sucesso!');
        console.log(account);

        this.storageService.saveData({key: STORAGE_KEYS.isAdmin, value: account.isAdmin });
        this.storageService.saveData({key: STORAGE_KEYS.isLoggedIn, value: true });
        this.storageService.saveData({key: STORAGE_KEYS.username, value: account.username });
        this.storageService.saveData({key: STORAGE_KEYS.name, value: account.name });
        this.storageService.saveData({key: STORAGE_KEYS.email, value: account.email });

        account.isAdmin
          ? this.navigateToPage(ROUTE_NAMES.admin_page, '')
          : this.navigateToPage(ROUTE_NAMES.explore_page, '');
      },
      error: error => {
        console.error('Erro ao logar usuário:', error);
        message.push(defaultLogin());
      }
    });

    return message[0];

  }
}
