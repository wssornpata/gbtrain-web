import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FareCalculatorRequest } from '../dto/search/request/fare-calculator-request.model';

@Injectable({
  providedIn: 'root',
})
export class FareCalculatorService {
  constructor(private http: HttpClient) {}

  calculateFare(fareCalculatorRequest: FareCalculatorRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${environment.BASEURL_CALCULATOR}/calculatefare`,
      fareCalculatorRequest,
      { observe: 'response' }
    );
  }
}
