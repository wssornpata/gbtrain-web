import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FareCalculatorRequest } from '../search/search-input-box/dtop/request/fare-calculator-request.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  calculateFare(
    fareCalculatorRequest: FareCalculatorRequest
  ): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${environment.BASEURL_CALCULATOR}/calculatefare`,
      fareCalculatorRequest,
      { observe: 'response' }
    );
  }
}
