import { Component, OnInit, TemplateRef } from '@angular/core';
import { PriceAdjustorRequest } from './request/price-adjustor-request';
import { FareRateModel } from '../model/farerate-model';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { environment } from '../../environments/environment';
import { MessageResponse } from '../dto/error/response/error-message-response';
import { DateService } from '../services/date.service';
import { PriceAdjustorService } from '../services/price-adjustor.service';

@Component({
  selector: 'app-admin-price-adjustor-panel',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, ModalModule],
  providers: [BsModalService, DatePipe, PriceAdjustorService, DateService],
  templateUrl: './admin-price-adjustor-panel.component.html',
  styleUrl: './admin-price-adjustor-panel.component.css',
})
export class AdminPriceAdjustorPanelComponent implements OnInit {
  modalRef?: BsModalRef;
  fareRates: FareRateModel[] = [];
  priceAdjustorRequestList: PriceAdjustorRequest[] = [];
  messageResponse: MessageResponse = { message: '' };
  responseData: any;

  constructor(
    private modalService: BsModalService,
    private priceAdjustorService: PriceAdjustorService,
    public dateService: DateService
  ) {}
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
    this.adjustPrices(this.mapFareRatesToPriceAdjustorRequests);
    this.closeModal();
  }

  onDecline(): void {
    this.loadFareRate();
    this.closeModal();
  }

  setMessage(message: string): void {
    this.messageResponse.message = message;
  }

  loadFareRate(): void {
    this.priceAdjustorService.getRate().subscribe(
      (response: HttpResponse<any>) => {
        this.fareRates = response.body;
      },
      (httpErrorResponse: HttpErrorResponse) => {
        console.error('Error occurred:', httpErrorResponse);
      }
    );
  }

  adjustPrices(priceAdjustorRequestList: PriceAdjustorRequest[]) {
    this.priceAdjustorService
      .postPriceAdjustment(priceAdjustorRequestList)
      .subscribe(
        (response: HttpResponse<any>) => {
          this.responseData = response.body;
          this.messageResponse.message = 'Success';
        },
        (httpErrorResponse: HttpErrorResponse) => {
          this.setMessage(
            httpErrorResponse.error.status + ' ' + httpErrorResponse.error.error
          );
          console.error('Error occurred:', httpErrorResponse);
        }
      );
  }

  private get mapFareRatesToPriceAdjustorRequests(): PriceAdjustorRequest[] {
    return this.fareRates.map((fareRate) => {
      return new PriceAdjustorRequest(
        fareRate.id,
        fareRate.distance,
        fareRate.price,
        fareRate.description
      );
    });
  }
}
