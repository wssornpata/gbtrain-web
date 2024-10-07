import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AdminComponent } from './admin/admin.component';
import { SearchComponent } from './search/search.component';
import { AdminTransactionComponent } from './admin/admin-price-adjustor-panel/admin-transaction/admin-transaction.component';

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
    title: 'Adjust price page',
  },
  {
    path: 'admin/transaction',
    component: AdminTransactionComponent,
    title: 'transaction history',
  },
];

export default routes;
