import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputBoxComponent } from './input-box/input-box.component';


const routes: Routes = [
  {
    path: 'search',
    component: InputBoxComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
