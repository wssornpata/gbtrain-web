import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PriceAdjustorRequest } from '../request/price-adjustor-request';
import { FareRateModel } from '../../model/farerate-model';
import {
  HttpClientModule,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { MessageResponse } from '../../dto/error/response/error-message-response';
import { DateService } from '../../services/date.service';
import { ErrorHandlingService } from '../../services/errorhandling.service';
import { AdminPriceAdjustorService } from '../services/admin-price-adjustor.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-price-adjustor-panel',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, ModalModule],
  providers: [BsModalService, DatePipe, AdminPriceAdjustorService, DateService],
  templateUrl: './admin-price-adjustor-panel.component.html',
  styleUrls: ['./admin-price-adjustor-panel.component.css'],
})
export class AdminPriceAdjustorPanelComponent implements OnInit, OnDestroy {
  modalRef?: BsModalRef;
  messageResponse: MessageResponse = new MessageResponse();
  myForm: FormGroup<{ fareRatesFormArray: FormArray<FormGroup<any>> }>;
  destroy: Subject<void> = new Subject<void>();

  constructor(
    private modalService: BsModalService,
    private adminPriceAdjustorService: AdminPriceAdjustorService,
    private errorHandlingService: ErrorHandlingService,
    private fb: FormBuilder,
    public dateService: DateService
  ) {
    this.myForm = this.fb.group({
      fareRatesFormArray: new FormArray<FormGroup<any>>([]),
    });
  }

  get fareRatesFormArray(): FormArray<FormGroup<any>> {
    return this.myForm.controls.fareRatesFormArray;
  }

  createFormGroup(farerate: FareRateModel): FormGroup {
    return this.fb.group({
      id: [farerate.id],
      distance: [farerate.distance],
      description: [farerate.description, Validators.required],
      price: [farerate.price, Validators.required],
      updateDatetime: [farerate.updateDatetime],
    });
  }

  logform(): void {
    console.log(this.myForm);
  }

  ngOnInit(): void {
    this.loadFareRate();
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  closeModal(): void {
    this.modalRef?.hide();
  }

  onConfirm(): void {
    const priceAdjustorRequestList = this.wrapperFareRateRequestList();
    this.adjustPrices(priceAdjustorRequestList);
    this.closeModal();
  }

  onDecline(): void {
    this.loadFareRate();
    this.closeModal();
  }

  async loadFareRate(): Promise<void> {
    try {
      const response: HttpResponse<any> =
        await this.adminPriceAdjustorService.getRate();
      const fareRates = response.body;
      this.initializeForm(fareRates);
    } catch (error) {
      this.errorHandlingService.handleError(error);
    }
  }

  initializeForm(fareRates: FareRateModel[]): void {
    const fareRatesFormArray = this.fareRatesFormArray;
    fareRatesFormArray.clear();

    fareRates.forEach((fareRate) => {
      const fareRateForm = this.createFormGroup(fareRate);
      fareRatesFormArray.push(fareRateForm);
    });
  }

  async adjustPrices(
    priceAdjustorRequestList: PriceAdjustorRequest[]
  ): Promise<void> {
    try {
      await this.adminPriceAdjustorService.postPriceAdjustment(
        priceAdjustorRequestList
      );
      this.loadFareRate();
      this.messageResponse.setMessage('Success');
    } catch (error) {
      this.messageResponse = this.errorHandlingService.handleError(error);
    }
  }

  private wrapperFareRateRequestList(): PriceAdjustorRequest[] {
    return this.fareRatesFormArray.controls.map((control: FormGroup) => {
      const fareRate = control.value;
      return new PriceAdjustorRequest(
        fareRate.id,
        fareRate.distance,
        fareRate.price,
        fareRate.description
      );
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}