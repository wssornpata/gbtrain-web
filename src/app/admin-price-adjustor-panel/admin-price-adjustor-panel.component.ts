import { Component, OnInit } from '@angular/core';
import { PriceAdjustorRequest } from './request/price-adjustor-request';
import { FareRateModel } from '../model/farerate-model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-price-adjustor-panel',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './admin-price-adjustor-panel.component.html',
  styleUrl: './admin-price-adjustor-panel.component.css',
})
export class AdminPriceAdjustorPanelComponent implements OnInit {
  fareRates: FareRateModel[] = [];
  priceAdjustorRequests: PriceAdjustorRequest[] = [];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.loadFareRate();
  }

  loadFareRate(): void {
    this.http
      .get<FareRateModel[]>(`${environment.BASEURL_PRICEADJUSTOR}/getfarerate`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching station data', error);
          return of([]);
        })
      )
      .subscribe((data: FareRateModel[]) => {
        this.fareRates = data;
      });
  }

  sendPriceAdjustorRequests(): void {
    this.mapFareRatesToPriceAdjustorRequests();
    console.log(this.priceAdjustorRequests);

    this.http
      .patch(
        `${environment.BASEURL_PRICEADJUSTOR}/adjustprice`,
        this.priceAdjustorRequests
      )
      .pipe(
        catchError((error: any) => {
          console.error('Error sending price adjustor requests', error);
          return of(null);
        })
      )
      .subscribe((response: any) => {
        this.loadFareRate();
      });
  }

  private mapFareRatesToPriceAdjustorRequests(): void {
    this.priceAdjustorRequests = this.fareRates.map((fareRate) => {
      return new PriceAdjustorRequest(
        fareRate.id,
        fareRate.distance,
        fareRate.price,
        fareRate.description
      );
    });
  }
}
