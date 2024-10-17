import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FareCalculatorRequest } from './dto/request/fare-calculator-request.model';

@Injectable({
  providedIn: 'root',
})
export class SearchInputBoxService {
  constructor(private http: HttpClient) {}

  getType(): Promise<HttpResponse<any>> {
    return firstValueFrom(
      this.http.get<HttpResponse<any>>(
        `${environment.BASEURL_DROPDOWN}/type`, 
        { observe: 'response'}
      )
    );
  }

  getStations(): Promise<HttpResponse<any>> {
    return firstValueFrom(
      this.http.get<HttpResponse<any>>(
        `${environment.BASEURL_DROPDOWN}/station`,
        { observe: 'response' }
      )
    );
  }

  calculateFare(
    fareCalculatorRequest: FareCalculatorRequest
  ): Promise<HttpResponse<any>> {
    return firstValueFrom(
      this.http.post<any>(
        `${environment.BASEURL_CALCULATOR}/calculatefare`,
        fareCalculatorRequest,
        { observe: 'response' }
      )
    );
  }
}