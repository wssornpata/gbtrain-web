import { Component } from '@angular/core';
import { AdminPriceAdjustorPanelComponent } from '../admin-price-adjustor-panel/admin-price-adjustor-panel.component';
import { AdminTransactionComponent } from '../admin-transaction/admin-transaction.component';
import { RouterModule } from '@angular/router';

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
