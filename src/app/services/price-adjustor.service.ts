import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PriceAdjustorRequest } from '../admin-price-adjustor-panel/request/price-adjustor-request';
import { MessageResponse } from '../dto/error/response/error-message-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceAdjustorService {
  messageResponse:MessageResponse = {
    message: ''
  }

  constructor(
    private http: HttpClient,
  ) {}

  getRate(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(
      `${environment.BASEURL_PRICEADJUSTOR}/getfarerate`,
      { observe: 'response' }
    );
  }

  postPriceAdjustment(priceAdjustorRequestList: PriceAdjustorRequest[]): Observable<HttpResponse<any>> {
    return this.http
      .patch<HttpResponse<any>>(
        `${environment.BASEURL_PRICEADJUSTOR}/adjustprice`,
        priceAdjustorRequestList,
        { observe: 'response' }
      )
  }
}
