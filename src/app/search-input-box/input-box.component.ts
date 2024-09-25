import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Type,
  TemplateRef,
} from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import {
  catchError,
  lastValueFrom,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { FareCalculatorRequest } from '../dto/search/request/fare-calculator-request.model';
import { StationModel } from '../model/station-model';
import { TypeModel } from '../model/type-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { environment } from '../../environments/environment';
import { AlertConfig, AlertModule } from 'ngx-bootstrap/alert';
import { MessageResponse } from '../dto/error/response/error-message-response';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { DropdownService } from '../services/dropdown.service';
import { FareCalculatorService } from '../services/fare-calculator.service';
import { FareCalculatorResponse } from '../dto/search/response/fare-calculator-response.model';

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
    ModalModule,
  ],
  providers: [
    AlertConfig,
    BsModalService,
    FareCalculatorService,
    DropdownService,
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

  //Partial make ng template error
  responseData: FareCalculatorResponse = {
    source: '',
    destination: '',
    type: 0,
    distance: 0,
    price: 0,
  };

  messageResponse: MessageResponse = {
    message: '',
  };

  modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private fareCalculatorService: FareCalculatorService,
    private dropdownService: DropdownService
  ) {}

  ngOnInit(): void {
    this.loadStations();
    this.loadType();
  }

  selectedType(type: number): void {
    this.type = type;
  }

  openModal(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  closeModal(): void {
    this.modalRef?.hide();
  }

  private loadStations(): void {
    this.dropdownService.getStations().subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.stations = response.body;
          console.log('Stations loaded successfully:', response.body);
        }
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error('Error loading stations:', httpErrorResponse);
      }
    );
  }

  private loadType(): void {
    this.dropdownService.getType().subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.types = response.body;
          console.log('Type loaded successfully:', response.body);
        }
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error('Error loading types:', httpErrorResponse);
      }
    );
  }

  callCalculate(responseModalTemplate: any): void {
    const fareCalculatorRequest: FareCalculatorRequest = {
      source: this.source,
      destination: this.destination,
      type: this.type,
    };

    this.fareCalculatorService.calculateFare(fareCalculatorRequest).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.responseData = response.body;
          this.openModal(responseModalTemplate);
        }
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error('Error loading types:', httpErrorResponse);
        this.messageResponse.message = httpErrorResponse.error.message;
      }
    );
  }
}
