import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationService } from '../../services/navigation.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm: FormGroup;
  username: string;
  password: string;
  errorMessage: string;

  constructor(
    private navigationService: NavigationService,
    private fb: FormBuilder,
    private storageService: StorageService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.username = '';
    this.password = '';
    this.errorMessage = '';
  }

  navigateToPage(page: string, title: string) {
    this.navigationService.navigateToPage(page, title);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.username === 'admin' && this.password === 'admin') {
      this.storageService.saveData('isAdmin', { value: true });
      this.navigateToPage('admin-page', '');
    } else {
      this.errorMessage = 'Credenciais inválidas. Tente novamente.';
    }
  }

  isEmailInvalid() {
    return false;
  }

  isPasswordInvalid() {
    return false;
  }
}
