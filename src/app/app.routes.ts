import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { ExplorePageComponent } from './pages/explore-page/explore-page.component';
import { ListContentComponent } from './pages/list-content/list-content.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ManagerPageComponent } from './pages/manager-page/manager-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'admin-page', component: AdminPageComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'details-page', component: DetailsPageComponent },
  { path: 'explore-page', component: ExplorePageComponent },
  { path: 'list-content', component: ListContentComponent },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'manager-page', component: ManagerPageComponent },
  { path: 'user-page', component: UserPageComponent },
  { path: '**', redirectTo: '' }
];
