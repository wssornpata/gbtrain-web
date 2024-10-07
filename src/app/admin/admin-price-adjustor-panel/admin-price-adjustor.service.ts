import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FareCalculatorRequest } from '../../search/search-input-box/dtop/request/fare-calculator-request.model';
import { PriceAdjustorRequest } from '../request/price-adjustor-request';

@Injectable({
  providedIn: 'root'
})
export class AdminTransactionService {
  constructor(private http: HttpClient) {}

  getRate(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(
      `${environment.BASEURL_PRICEADJUSTOR}/getfarerate`,
      { observe: 'response' }
    );
  }

  postPriceAdjustment(
    priceAdjustorRequestList: PriceAdjustorRequest[]
  ): Observable<HttpResponse<any>> {
    return this.http.patch<HttpResponse<any>>(
      `${environment.BASEURL_PRICEADJUSTOR}/adjustprice`,
      priceAdjustorRequestList,
      { observe: 'response' }
    );
  }
}
