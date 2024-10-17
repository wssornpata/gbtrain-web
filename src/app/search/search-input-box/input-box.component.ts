import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  HttpClientModule,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertConfig, AlertModule } from 'ngx-bootstrap/alert';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { FareCalculatorRequest } from './dtop/request/fare-calculator-request.model';
import { StationModel } from '../../model/station-model';
import { TypeModel } from '../../model/type-model';
import { MessageResponse } from '../../dto/error/response/error-message-response';
import { FareCalculatorResponse } from './dtop/response/fare-calculator-response.model';
import { ErrorHandlingService } from '../../services/errorhandling.service';
import { SearchInputBoxService } from './searchInputBox.service';

@Component({
  selector: 'app-input-box',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TypeaheadModule,
    BsDropdownModule,
    HttpClientModule,
    AlertModule,
    ModalModule,
  ],
  providers: [AlertConfig, BsModalService, SearchInputBoxService],
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css'],
})
export class InputBoxComponent implements OnInit {
  form: FormGroup;
  stations: StationModel[] = [];
  types: TypeModel[] = [];
  responseData: FareCalculatorResponse = new FareCalculatorResponse();
  messageResponse: MessageResponse = new MessageResponse();
  modalRef?: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private errorHandlingService: ErrorHandlingService,
    private searchInputBoxService: SearchInputBoxService
  ) {
    this.form = this.fb.group({
      source: ['', [Validators.required, Validators.maxLength(5)]],
      destination: ['', [Validators.required, Validators.maxLength(5)]],
      type: [1, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadStations();
    this.loadType();
  }

  selectedType(type: number): void {
    this.form.patchValue({ type });
  }

  openModal(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  closeModal(): void {
    this.modalRef?.hide();
  }

  private async loadStations(): Promise<void> {
    try {
      const response: HttpResponse<any> =
        await this.searchInputBoxService.getStations();
      this.stations = response.body;
    } catch (error) {
      this.errorHandlingService.handleError(error);
    }
  }

  private async loadType(): Promise<void> {
    try {
      const response: HttpResponse<any> =
        await this.searchInputBoxService.getType();
      this.types = response.body;
    } catch (error) {
      this.errorHandlingService.handleError(error);
    }
  }

  onSelectSource(event: any): void {
    this.form.get('source')?.setValue(event.item.stationName);
  }

  onSelectDestination(event: any): void {
    this.form.get('destination')?.setValue(event.item.stationName);
  }

  async callCalculate(responseModalTemplate: any): Promise<void> {
    this.messageResponse.clearMessage();
    const fareCalculatorRequest = new FareCalculatorRequest(
      this.form.value.source,
      this.form.value.destination,
      this.form.value.type
    );

    try {
      const response: HttpResponse<any> =
        await this.searchInputBoxService.calculateFare(fareCalculatorRequest);
		this.responseData = response.body;
		this.openModal(responseModalTemplate);
    } catch (error) {
      this.errorHandlingService.handleError(error);
    }
  }
}
