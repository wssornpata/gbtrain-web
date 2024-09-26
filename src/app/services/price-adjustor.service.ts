import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PriceAdjustorRequest } from '../dto/admin/request/price-adjustor-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PriceAdjustorService {
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
