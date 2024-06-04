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
import { StatisticsComponent } from './pages/statistics-page/statistics-component.component'

export type ROUTES_TYPE = {
  root: string;
  admin_page: string;
  create_account: string;
  details_page: string;
  explore_page: string;
  list_content: string;
  login_page: string;
  main_page: string;
  manager_page: string;
  user_page: string;
  statistics: string;
  default: string;  
}

export const ROUTE_NAMES: ROUTES_TYPE = {
  root: '',
  admin_page: 'admin-page',
  create_account: 'create-account',
  details_page: 'details-page',
  explore_page: 'explore-page',
  list_content: 'list-content',
  login_page: 'login-page',
  main_page: 'main-page',
  manager_page: 'manager-page',
  user_page: 'user-page',
  statistics: 'statistics',
  default: '**'
};

export const routes: Routes = [
  { path: ROUTE_NAMES.root, component: MainPageComponent },
  { path: ROUTE_NAMES.admin_page, component: AdminPageComponent },
  { path: ROUTE_NAMES.create_account, component: CreateAccountComponent },
  { path: ROUTE_NAMES.details_page, component: DetailsPageComponent },
  { path: ROUTE_NAMES.explore_page, component: ExplorePageComponent },
  { path: ROUTE_NAMES.list_content, component: ListContentComponent },
  { path: ROUTE_NAMES.login_page, component: LoginPageComponent },
  { path: ROUTE_NAMES.main_page, component: MainPageComponent },
  { path: ROUTE_NAMES.manager_page, component: ManagerPageComponent },
  { path: ROUTE_NAMES.user_page, component: UserPageComponent },
  { path: ROUTE_NAMES.statistics, component: StatisticsComponent},
  { path: ROUTE_NAMES.default, redirectTo: '' }
];
