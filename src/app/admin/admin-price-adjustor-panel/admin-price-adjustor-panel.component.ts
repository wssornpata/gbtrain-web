import { Component, OnInit, TemplateRef } from '@angular/core';
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
import { AdminTransactionService } from './admin-price-adjustor.service';

@Component({
  selector: 'app-admin-price-adjustor-panel',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, ModalModule],
  providers: [BsModalService, DatePipe, AdminTransactionService, DateService],
  templateUrl: './admin-price-adjustor-panel.component.html',
  styleUrls: ['./admin-price-adjustor-panel.component.css'],
})
export class AdminPriceAdjustorPanelComponent implements OnInit {
  modalRef?: BsModalRef;
  messageResponse: MessageResponse = new MessageResponse();
  priceAdjustorForm: FormGroup;

  constructor(
    private modalService: BsModalService,
    private adminTransactionService: AdminTransactionService,
    public dateService: DateService,
    private fb: FormBuilder
  ) {
    this.priceAdjustorForm = this.fb.group({
      fareRates: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadFareRate();
  }

  get fareRatesFormArray(): FormArray {
    return this.priceAdjustorForm.get('fareRates') as FormArray;
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

  loadFareRate(): void {
    this.adminTransactionService.getRate().subscribe(
      (response: HttpResponse<any>) => {
        const fareRates = response.body;
        this.initializeForm(fareRates);
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error('Error occurred:', httpErrorResponse);
      }
    );
  }

  initializeForm(fareRates: FareRateModel[]): void {
    const fareRatesFormArray = this.fb.array(
      fareRates.map((fareRate) =>
        this.fb.group({
          id: [fareRate.id],
          distance: [fareRate.distance],
          price: [fareRate.price, [Validators.required, Validators.min(0)]],
          description: [fareRate.description, [Validators.required, Validators.max(255)]],
          updateDatetime: [fareRate.updateDatetime],
        })
      )
    );
    this.priceAdjustorForm.setControl('fareRates', fareRatesFormArray);
  }

  adjustPrices(priceAdjustorRequestList: PriceAdjustorRequest[]) {
    this.messageResponse.clearMessage();
    this.adminTransactionService
      .postPriceAdjustment(priceAdjustorRequestList)
      .subscribe( 
        (response: HttpResponse<any>) => {
          this.messageResponse.setMessage('Success');
        },
        (httpErrorResponse: HttpErrorResponse) => {
          this.messageResponse.setMessage(
            httpErrorResponse.error.status + ' ' + httpErrorResponse.error.error
          );
          console.error('Error occurred:', httpErrorResponse);
        }
      );
  }

  private wrapperFareRateRequestList(): PriceAdjustorRequest[] {
    return this.fareRatesFormArray.controls.map((control) => {
      const fareRate = control.value;
      return new PriceAdjustorRequest(
        fareRate.id,
        fareRate.distance,
        fareRate.price,
        fareRate.description
      );
    });
  }
}