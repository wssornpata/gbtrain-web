import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  handleError(error: any): void {
    console.error('Error occurred:', error);

    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        console.error('Network error:', error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, body was:`,
          error.error
        );
      }
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }

}
