import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationService } from '../../services/navigation.service';
import { ROUTE_NAMES } from '../../app.routes';
import { LoginService } from '../../services/login.service';

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
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  username: string;
  password: string;
  errorMessage: string;

  ROUTE_NAMES = ROUTE_NAMES;

  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService,
    private loginService: LoginService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.username = '';
    this.password = '';
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  navigateToPage(page: string, title: string): void {
    this.navigationService.navigateToPage(page, title);
  }

  login(): void {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value);
    } else {
      this.errorMessage = 'Por favor, preencha o formulário corretamente.';
    }
  }
}
