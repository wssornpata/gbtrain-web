import { CommonModule, DatePipe } from '@angular/common';
import {
  HttpClientModule,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionModel } from '../../../model/transaction-model';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ErrorHandlingService } from '../../../services/errorhandling.service';
import { DateService } from '../../../services/date.service';
import { AdminTransactionService } from './admin-transaction.service';

@Component({
  selector: 'app-admin-transaction',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, PaginationModule],
  providers: [AdminTransactionService, DateService, DatePipe],
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
    private adminTransactionService: AdminTransactionService,
    public dateService: DateService,
    private errorHandlingService: ErrorHandlingService
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  private async loadTransactions(): Promise<void> {
    try {
      const response: HttpResponse<any> =
        await this.adminTransactionService.getTransactions();
		this.transactions = response.body;
		this.applyFilter();
    } catch (error) {
      this.errorHandlingService.handleError(error);
    }
  }

  applyFilter(): void {
    if (this.searchCriteria) {
      this.filteredTransactions = this.transactions.filter(
        (transaction) =>
          transaction.origin.includes(this.searchCriteria) ||
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
