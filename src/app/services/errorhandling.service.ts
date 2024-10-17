import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageResponse } from '../dto/error/response/error-message-response';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  handleError(error: any): MessageResponse  {
    console.error('Error occurred:', error);

    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        return new MessageResponse(`Network error : ${error}`);
      } else {
        return new MessageResponse(error.error.message);
      }
    } else {
      return new MessageResponse(`An unexpected error occurred: ${error}`)
    }
  }
}
