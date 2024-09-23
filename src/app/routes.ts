import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AdminComponent } from './admin/admin.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    title: 'Landing page',
  },
  {
    path: 'search',
    component: SearchComponent,
    title: 'Search page',
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'InputBox page',
  },
];

export default routes;
