import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  isResponseOk(statusCode: number): boolean{
    return statusCode === 200
  }
}
