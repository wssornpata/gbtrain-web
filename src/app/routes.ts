import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { InputBoxComponent } from './input-box/input-box.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    title: 'Landing page',
  },
  {
    path: 'search',
    component: InputBoxComponent,
    title: 'InputBox page',
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'InputBox page',
  },
];

export default routes;
