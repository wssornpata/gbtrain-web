import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StationModel } from '../model/station-model';
import { TypeModel } from '../model/type-model';
import { FareCalculatorRequest } from '../input-box/request/fare-calculator-request.model';

@Injectable({
  providedIn: 'root',
})
export class FareCalculatorService {
  constructor(private http: HttpClient) {}

  public getStations(): Observable<StationModel[]> {
    return this.http
      .get<StationModel[]>(`${environment.BASEURL_DROPDOWN}/station`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching station data', error);
          return of([]);
        })
      );
  }

  public getTypes(): Observable<TypeModel[]> {
    return this.http
      .get<TypeModel[]>(`${environment.BASEURL_DROPDOWN}/type`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching type data', error);
          return of([]);
        })
      );
  }

  calculateFare(request: FareCalculatorRequest): Observable<any> {
    return this.http
      .post<any>(`${environment.BASEURL_CALCULATOR}/calculatefare`, request)
      .pipe(
        catchError((error: any) => {
          console.error('Error calculating fare', error);
          return of(null);
        })
      );
  }
}