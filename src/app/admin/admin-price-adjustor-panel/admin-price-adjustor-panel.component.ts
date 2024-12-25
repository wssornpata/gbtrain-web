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
import { AdminAdjustorFormService } from '../services/admin-adjustor-form.service';
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
  form: FormGroup<{ fareRatesFormArray: FormArray<FormGroup<any>> }>;
  destroy: Subject<void> = new Subject<void>();

  constructor(
    private modalService: BsModalService,
    private adminPriceAdjustorService: AdminPriceAdjustorService,
    private adminAdjustorFormService: AdminAdjustorFormService,
    private errorHandlingService: ErrorHandlingService,
    public dateService: DateService
  ) {
    this.form = this.createForm();
  }

  logform(): void{
    console.log(this.form)
  }

  ngOnInit(): void {
    this.loadFareRate();
  }

  createForm(): FormGroup {
    return new FormGroup<{ fareRatesFormArray: FormArray<FormGroup<any>> }>({
      fareRatesFormArray: new FormArray<FormGroup<any>>([]),
    });
  }

  getFareRatesFormArray(): FormArray<FormGroup<any>> {
    return this.form.controls.fareRatesFormArray;
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
    const fareRatesFormArray = this.getFareRatesFormArray();
    fareRatesFormArray.clear();
    console.log(fareRates);
    
    fareRates.forEach((fareRate) => {
      const fareRateForm = this.adminAdjustorFormService.initAdminAdjustorForm(
        this.destroy
      ) as FormGroup<any>;
      
      // fareRateForm.patchValue(fareRate);
      fareRateForm.controls['id'].setValue(fareRate.id)
      fareRateForm.controls['distance'].setValue(fareRate.distance)
      fareRateForm.controls['description'].setValue(fareRate.description)  
      fareRateForm.controls['price'].setValue(fareRate.price)
      fareRateForm.controls['updateDatetime'].setValue(fareRate.updateDatetime)
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

