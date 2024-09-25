import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionModel } from '../model/transaction-model';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TransactionService } from '../services/transaction.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-admin-transaction',
  standalone: true,
  imports: [
    HttpClientModule, 
    CommonModule, 
    FormsModule, 
    PaginationModule,
  ],
  providers: [
    TransactionService,
    HttpService,
  ],
  templateUrl: './admin-transaction.component.html',
  styleUrl: './admin-transaction.component.css',
})
export class AdminTransactionComponent implements OnInit {
  transactions: TransactionModel[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  constructor(
    private transactionService: TransactionService,
    private httpService: HttpService,
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  private loadTransactions(): void {
    this.transactionService.getTransactions().subscribe(
      (response: HttpResponse<any>) => {
        if (this.httpService.isResponseOk(response.status)) {
          this.transactions = response.body;
          this.totalItems = this.transactions.length;
        }
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error('Error loading types:', httpErrorResponse);
      }
    );
  }

  get paginatedTransactions(): TransactionModel[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.transactions.slice(start, end);
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
  }
}
