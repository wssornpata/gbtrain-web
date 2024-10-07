import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FareCalculatorRequest } from './dtop/request/fare-calculator-request.model';

@Injectable({
  providedIn: 'root'
})
export class SearchInputBoxService {
  constructor(private http: HttpClient) {}

  getType(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(
      `${environment.BASEURL_DROPDOWN}/type`,
      { observe: 'response' }
    );
  }

  getStations(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(
      `${environment.BASEURL_DROPDOWN}/station`,
      { observe: 'response' }
    );
  }
  
  calculateFare(fareCalculatorRequest: FareCalculatorRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${environment.BASEURL_CALCULATOR}/calculatefare`,
      fareCalculatorRequest,
      { observe: 'response' }
    );
  }
}
