import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AdminTransactionService {
  constructor(private http: HttpClient) {}

  getTransactions(): Promise<HttpResponse<any>> {
    return firstValueFrom(
      this.http.get<HttpResponse<any>>(
        `${environment.BASEURL_TRANSACTION}/gettransaction`,
        { observe: 'response' }
      )
    );
  }
}
