import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Type,
} from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { FareCalculatorRequest } from './request/fare-calculator-request.model';
import { StationModel } from '../model/station-model';
import { TypeModel } from '../model/type-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { environment } from '../../environments/environment';
import { AlertConfig, AlertModule } from 'ngx-bootstrap/alert';
import { MessageResponse } from '../dto/error/response/error-message-response';

@Component({
  selector: 'app-input-box',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TypeaheadModule,
    BsDropdownModule,
    HttpClientModule,
    AlertModule,
  ],
  providers: [AlertConfig],
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css'],
})
export class InputBoxComponent implements OnInit {
  source: string = '';
  destination: string = '';
  type: number = 1;
  stations: StationModel[] = [];
  types: TypeModel[] = [];
  responseData: any;
  messageResponse: MessageResponse = { message: '' };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStations();
    this.loadType();
  }

  selectedType(type: number): void {
    this.type = type;
  }

  private loadStations(): void {
    this.http
      .get<HttpResponse<any>>(
        `${environment.BASEURL_DROPDOWN}/station`,
        { observe: 'response' }
      )
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse) => {
          console.error('Error fetching station data', httpErrorResponse);
          return of([]);
        })
      )
      .subscribe((response: any) => {
        if(response.status == 200){
          this.stations = response.body
        }
      });
  }

  private loadType(): void {
    this.http
      .get<HttpResponse<any>>(
        `${environment.BASEURL_DROPDOWN}/type`,
        { observe: 'response' }
      )
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse) => {
          console.error('Error fetching station data', httpErrorResponse);
          return of([]);
        })
      )
      .subscribe((response: any) => {
        if (response.status === 200) {
          this.types = response.body;
        }
      });
  }

  callCalculate(): void {
    const requestBody: FareCalculatorRequest = {
      source: this.source,
      destination: this.destination,
      type: this.type,
    };

    this.http
      .post<HttpResponse<any>>(
        `${environment.BASEURL_CALCULATOR}/calculatefare`,
        requestBody,
        { observe: 'response' },
      )
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse) => {
          this.messageResponse.message = httpErrorResponse.error.message;
          return of([]);
        })
      )
      .subscribe((response: any) => {
        if (response.status === 200) {
          this.responseData = response.body;
        }
      });
  }
}
