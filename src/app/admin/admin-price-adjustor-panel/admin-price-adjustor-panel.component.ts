import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { MessageResponse } from '../../dto/error/response/error-message-response';
import { DateService } from '../../services/date.service';
import { AdminTransactionService } from '../services/admin-price-adjustor.service';
import { ErrorHandlingService } from '../../services/errorhandling.service';
import { AdminAdjustorFormService } from '../services/admin-adjustor-form.service';
import { FareRateModel } from '../../model/farerate-model';
import { PriceAdjustorRequest } from '../request/price-adjustor-request';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-price-adjustor-panel',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, ModalModule],
  providers: [BsModalService, DatePipe, AdminTransactionService, DateService],
  templateUrl: './admin-price-adjustor-panel.component.html',
  styleUrls: ['./admin-price-adjustor-panel.component.css'],
})
export class AdminPriceAdjustorPanelComponent implements OnInit, OnDestroy {
  logger(formControl: any) {
    console.log(formControl);
  }

  modalRef?: BsModalRef;
  messageResponse: MessageResponse = new MessageResponse();
  priceAdjustorForm: FormGroup<{ fareRatesFormArray: FormArray<FormGroup<any>> }>;
  destroy: Subject<void> = new Subject<void>();

  constructor(
    private modalService: BsModalService,
    private adminTransactionService: AdminTransactionService,
    private adminAdjustorFormService: AdminAdjustorFormService,
    private errorHandlingService: ErrorHandlingService,
    public dateService: DateService
  ) {
    this.priceAdjustorForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadFareRate();
  }

  getFareRatesFormArray(): FormArray<FormGroup<any>> {
    return this.priceAdjustorForm.controls.fareRatesFormArray;
  }

  createForm(): FormGroup<{ fareRatesFormArray: FormArray<FormGroup<any>> }> {
    return new FormGroup<{ fareRatesFormArray: FormArray<FormGroup<any>> }>({
      fareRatesFormArray: new FormArray<FormGroup<any>>([]),
    });
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
        await this.adminTransactionService.getRate();
      const fareRates = response.body;
      this.initializeForm(fareRates);
    } catch (error) {
      this.errorHandlingService.handleError(error);
    }
  }

  initializeForm(fareRates: FareRateModel[]): void {
    const fareRatesFormArray = this.getFareRatesFormArray();
    fareRatesFormArray.clear();

    fareRates.forEach((fareRate) => {
      const fareRateForm = this.adminAdjustorFormService.initAdminAdjustorForm(
        this.destroy
      ) as FormGroup<any>;
      
      fareRateForm.patchValue(fareRate);
      fareRatesFormArray.push(fareRateForm);
    });
  }

  async adjustPrices(
    priceAdjustorRequestList: PriceAdjustorRequest[]
  ): Promise<void> {
    try {
      await this.adminTransactionService.postPriceAdjustment(
        priceAdjustorRequestList
      );
      this.loadFareRate();
      this.messageResponse.setMessage('Success');
    } catch (error) {
      this.messageResponse = this.errorHandlingService.handleError(error);
    }
  }

  private wrapperFareRateRequestList(): PriceAdjustorRequest[] {
    return this.getFareRatesFormArray().controls.map((control) => {
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
