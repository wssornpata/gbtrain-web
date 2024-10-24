import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageResponse } from '../dto/error/response/error-message-response';

@Injectable({
  providedIn: 'root',
})

export class ErrorHandlingService {
  handleError(error: any): MessageResponse {
    console.error('Error occurred:', error);

    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        return new MessageResponse(error.error, 'Network error');
      } else {
        return new MessageResponse(
          error.error.messageHeader,
          error.error.messasge
        );
      }
    } else {
      return new MessageResponse(error.error, 'An unexpected error occurred');
    }
  }
}
