import { CommonModule, DatePipe } from '@angular/common';
import {
  HttpClientModule,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionModel } from '../model/transaction-model';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TransactionService } from '../services/transaction.service';
import { HttpService } from '../services/http.service';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-admin-transaction',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, PaginationModule],
  providers: [TransactionService, DateService, DatePipe, HttpService],
  templateUrl: './admin-transaction.component.html',
  styleUrl: './admin-transaction.component.css',
})
export class AdminTransactionComponent implements OnInit {
  transactions: TransactionModel[] = [];
  filteredTransactions: TransactionModel[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  searchCriteria: string = '';

  constructor(
    private transactionService: TransactionService,
    public dateService: DateService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  private loadTransactions(): void {
    this.transactionService.getTransactions().subscribe(
      (response: HttpResponse<any>) => {
        if (this.httpService.isResponseOk(response.status)) {
          this.transactions = response.body;
          this.applyFilter();
        }
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error('Error loading transactions:', httpErrorResponse);
      }
    );
  }

  applyFilter(): void {
    if (this.searchCriteria) {
      this.filteredTransactions = this.transactions.filter(
        (transaction) =>
          transaction.source.includes(this.searchCriteria) ||
          transaction.destination.includes(this.searchCriteria)
      );
    } else {
      this.filteredTransactions = this.transactions;
    }
    this.totalItems = this.filteredTransactions.length;
  }

  get paginatedTransactions(): TransactionModel[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredTransactions.slice(start, end);
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
  }
}
