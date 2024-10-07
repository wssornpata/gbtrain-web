import { Component } from '@angular/core';
import { AdminPriceAdjustorPanelComponent } from './admin-price-adjustor-panel/admin-price-adjustor-panel.component';
import { RouterModule } from '@angular/router';
import { AdminTransactionComponent } from './admin-price-adjustor-panel/admin-transaction/admin-transaction.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    AdminPriceAdjustorPanelComponent,
	AdminTransactionComponent,
	RouterModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  
}
