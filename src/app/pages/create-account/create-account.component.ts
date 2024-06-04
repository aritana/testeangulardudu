import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ROUTE_NAMES } from '../../app.routes';
import { LendopsService } from '../../services/lendops.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent implements OnInit {
  accountForm: FormGroup;
  username: string;
  password: string;
  errorMessage: string;
  name: string;
  email: string;
  address: string;

  constructor(private navigationService: NavigationService,
    private fb: FormBuilder,
    private lendopservice: LendopsService
  ) {
    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
      isAdmin: [false]
    });

    this.username = '';
    this.password = '';
    this.errorMessage = '';
    this.name = '';
    this.email = '';
    this.address = '';
  }

  navigateToPage(page: string, title: string): void {
    this.navigationService.navigateToPage(page, title);
  }

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }


  goBack(): void {
    this.navigationService.navigateToPage(ROUTE_NAMES.main_page, '');
  }


  createAccount(): void {
    if (this.accountForm.valid) {
      const accountData = this.accountForm.value;
      this.lendopservice.createUser(accountData).subscribe({
        next: () => {
          console.log('Usuário criado com sucesso!');
          // Lógica adicional após o sucesso, se necessário
          this.navigateToPage(ROUTE_NAMES.main_page, '');
        },
        error: error => {
          console.error('Erro ao criar usuário:', error);
          // Exiba uma mensagem de erro adequada na interface do usuário, se necessário
          this.errorMessage = 'Erro ao criar usuário. Por favor, tente novamente.';
        }
      });
    } else {
      this.errorMessage = 'Por favor, preencha o formulário corretamente.';
    }
  }
}
