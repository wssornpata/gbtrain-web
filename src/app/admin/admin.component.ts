import { Component, OnInit } from '@angular/core';
import { FareRateModel } from '../model/farerate-model';
import { environment } from '../../environments/environment';
import { catchError, of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PriceAdjustorRequest } from '../admin-price-adjustor-panel/request/price-adjustor-request';
import { AdminPriceAdjustorPanelComponent } from '../admin-price-adjustor-panel/admin-price-adjustor-panel.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminPriceAdjustorPanelComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  
}
