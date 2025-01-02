import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertConfig, AlertModule } from 'ngx-bootstrap/alert';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { FareCalculatorRequest } from './dto/request/fare-calculator-request.model';
import { StationModel } from '../../model/station-model';
import { TypeModel } from '../../model/type-model';
import { MessageResponse } from '../../dto/error/response/error-message-response';
import { FareCalculatorResponse } from './dto/response/fare-calculator-response.model';
import { ErrorHandlingService } from '../../services/errorhandling.service';
import { Subject } from 'rxjs';
import { SearchInputBoxService } from '../services/searchInputBox.service';

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
export class InputBoxComponent implements OnInit, OnDestroy {
  rabbitCardImagePath: string = '../../../assets/img/RabbitCard.png';
  rabbitCardStudentImagePath: string =
    '../../../assets/img/RabbitCard-student.png';
  rabbitCardSeniorImagePath: string =
    '../../../assets/img/RabbitCard-senior.png';
  singleJourneyImagePath: string = '../../../assets/img/SingleJourney.png';

  onDestroy: Subject<void> = new Subject<void>();

  origin = '';
  destination = '';
  colorMap = new Map<string, string>();
  form!: FormGroup;
  stations: StationModel[] = [];
  types: TypeModel[] = [];
  responseData: FareCalculatorResponse = new FareCalculatorResponse();
  messageResponse: MessageResponse = new MessageResponse();
  modalRef?: BsModalRef;

  logForm() {
    console.log(this.form);
  }

  constructor(
    private modalService: BsModalService,
    private errorHandlingService: ErrorHandlingService,
    private searchInputBoxService: SearchInputBoxService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      origin: ['', [Validators.required, Validators.maxLength(255)]],
      destination: ['', [Validators.required, Validators.maxLength(255)]],
      type: [1, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadStations();
    this.loadType();
    // this.form = this.searchFormService.initSearchForm(this.onDestroy);
    // this.form.controls['type'].setValue(1);
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
      this.stations = this.getSortStations(response.body);
    } catch (error) {
      this.errorHandlingService.handleError(error);
    }
  }

  private getSortStations(stationList: StationModel[]): StationModel[]{
    
    let i = 0;
    return  stationList.sort((a, b) => {
      const getPriority = (stationName: string): number => {
        if (stationName.startsWith('N')) return 1;
        if (stationName.startsWith('CEN')) return 2;
        if (stationName.startsWith('E')) return 3;
        if (stationName.startsWith('W')) return 4;
        if (stationName.startsWith('S')) return 5;
        return 6;
      };

      const extractNumber = (stationName: string): number => {
        const match = stationName.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      };

      const priorityA = getPriority(a.stationName);
      const priorityB = getPriority(b.stationName);

      console.log(i+"  "+a.stationName+"  "+priorityA);
      console.log(i+"  "+b.stationName+"  "+priorityB);

      i+=1

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      if (priorityA === 1 || priorityA === 4) {
        return extractNumber(b.stationName) - extractNumber(a.stationName);
      }

      if (priorityA === 2) {
        return 0;
      }

      if (priorityA === 3 || priorityA === 5) {
        return extractNumber(a.stationName) - extractNumber(b.stationName);
      }
      return 0;
    });

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

  onSelectOrigin(): void {
    try {
      this.origin =
        this.stations.find(
          (station) =>
            station.stationFullname === this.form.controls['origin'].value
        )?.stationName || '';
    } catch (error) {
      this.origin = '';
    }
  }

  onSelectDestination(): void {
    try {
      this.destination =
        this.stations.find(
          (station) =>
            station.stationFullname === this.form.controls['destination'].value
        )?.stationName || '';
    } catch (error) {
      this.destination = '';
    }
  }

  onSelectType(typeId: number): void {
    this.form.controls['type'].setValue(typeId);
  }

  getSelectedTypeDescription(): string {
    const selectedType = this.types.find(
      (type) => type.id === this.form.controls['type'].value
    );
    return selectedType ? selectedType.description : '';
  }

  roundedUp(deci: number): any {
    return Math.round(deci);
  }

  async callCalculate(responseModalTemplate: any): Promise<void> {
    this.messageResponse.clearMessage();

    const fareCalculatorRequest = new FareCalculatorRequest(
      this.origin,
      this.destination,
      this.form.controls['type'].value
    );

    try {
      const response: HttpResponse<any> =
        await this.searchInputBoxService.calculateFare(fareCalculatorRequest);
      this.responseData = response.body;
      this.openModal(responseModalTemplate);
    } catch (error) {
      this.messageResponse = this.errorHandlingService.handleError(error);
      console.log(this.messageResponse);
    }
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
