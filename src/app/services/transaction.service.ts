import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http: HttpClient,
  ) { }

  getTransactions(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(
      `${environment.BASEURL_TRANSACTION}/gettransaction`,
      { observe: 'response' }
    );
  }
}
