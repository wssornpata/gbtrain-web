import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(
    private datePipe: DatePipe,
  ) {}

  formatDate(date: string | null | undefined): string {
    const transformedDate = this.datePipe.transform(
      date,
      environment.DATE_FORMATTER
    );
    return transformedDate !== null ? transformedDate : '';
  }
}
