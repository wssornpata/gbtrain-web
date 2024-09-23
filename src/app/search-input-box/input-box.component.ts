import { Component, OnInit, Type } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, of } from 'rxjs';
import { FareCalculatorRequest } from './request/fare-calculator-request.model';
import { StationModel } from '../model/station-model';
import { TypeModel } from '../model/type-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-input-box',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TypeaheadModule,
    BsDropdownModule,
    HttpClientModule,
  ],
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

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadStations();
    this.loadType();
  }

  private loadStations(): void {
    this.http
      .get<StationModel[]>(`${environment.BASEURL_DROPDOWN}/station`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching station data', error);
          return of([]);
        })
      )
      .subscribe((data: StationModel[]) => {
        this.stations = data;
      });
  }

  private loadType(): void {
    this.http
      .get<TypeModel[]>(`${environment.BASEURL_DROPDOWN}/type`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching station data', error);
          return of([]);
        })
      )
      .subscribe((data: TypeModel[]) => {
        this.types = data;
      });
  }

  selectedType(type: number): void {
    this.type = type;
  }

  fetchData(): void {
    const requestBody: FareCalculatorRequest = {
      source: this.source,
      destination: this.destination,
      type: this.type,
    };

    console.log(requestBody);

    this.http
      .post(`${environment.BASEURL_CALCULATOR}/calculatefare`, requestBody)
      .subscribe({
        next: (response) => {
          this.responseData = response;
          console.log('Fare data fetched successfully', response);
        },
        error: (error) => {
          console.error('Error fetching fare data', error);
        },
      });
  }
}
