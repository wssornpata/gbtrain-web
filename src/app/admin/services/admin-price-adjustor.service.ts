import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PriceAdjustorRequest } from '../request/price-adjustor-request';

@Injectable({
  providedIn: 'root',
})
export class AdminTransactionService {
  constructor(private http: HttpClient) {}

  getRate(): Promise<HttpResponse<any>> {
    return firstValueFrom(
      this.http.get<HttpResponse<any>>(
        `${environment.BASEURL_PRICEADJUSTOR}/getfarerate`,
        { observe: 'response' }
      )
    );
  }

  postPriceAdjustment(
    priceAdjustorRequestList: PriceAdjustorRequest[]
  ): Promise<HttpResponse<any>> {
    return firstValueFrom(
      this.http.patch<HttpResponse<any>>(
        `${environment.BASEURL_PRICEADJUSTOR}/adjustprice`,
        priceAdjustorRequestList,
        { observe: 'response' }
      )
    );
  }
}
