import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionModel } from '../model/transaction-model';
import { environment } from '../../environments/environment';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-admin-transaction',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './admin-transaction.component.html',
  styleUrl: './admin-transaction.component.css',
})
export class AdminTransactionComponent implements OnInit {
  transactions: TransactionModel[] = [];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.loadTransactions();
  }

  private loadTransactions(): void {
    this.http
      .get<HttpResponse<any>>(
        `${environment.BASEURL_TRANSACTION}/gettransaction`,
        { observe: 'response' }
      )
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse) => {
          console.error('Error fetching transaction data', httpErrorResponse);
          return of([]);
        })
      )
      .subscribe((response: any) => {
        if (response.status == 200) {
          this.transactions = response.body;
        }
      });
  }
}
