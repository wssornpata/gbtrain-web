import { Component, OnInit, TemplateRef } from '@angular/core';
import { PriceAdjustorRequest } from './request/price-adjustor-request';
import { FareRateModel } from '../model/farerate-model';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, delay, map, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { environment } from '../../environments/environment';
import { MessageResponse } from '../dto/error/response/error-message-response';

@Component({
  selector: 'app-admin-price-adjustor-panel',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, ModalModule],
  providers: [BsModalService],
  templateUrl: './admin-price-adjustor-panel.component.html',
  styleUrl: './admin-price-adjustor-panel.component.css',
})
export class AdminPriceAdjustorPanelComponent implements OnInit {
  modalRef?: BsModalRef;
  fareRates: FareRateModel[] = [];
  priceAdjustorRequests: PriceAdjustorRequest[] = [];
  messageResponse: MessageResponse = { message: '' };
  responseData: any;

  constructor(private http: HttpClient, private modalService: BsModalService) {}
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
    this.postPriceAdjustment();
    this.closeModal();
  }

  onDecline(): void {
    this.loadFareRate();
    this.closeModal();
  }

  loadFareRate(): void {
    this.http
      .get<HttpResponse<any>>(
        `${environment.BASEURL_PRICEADJUSTOR}/getfarerate`,
        { observe: 'response' }
      )
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse) => {
          console.error('Error fetching farerate data', httpErrorResponse);
          return of([]);
        })
      )
      .subscribe((response: any) => {
        if (response.status == 200) {
          this.fareRates = response.body;
        }
      });
  }

  postPriceAdjustment(): void {
    this.mapFareRatesToPriceAdjustorRequests();
    this.http
      .patch<HttpResponse<any>>(
        `${environment.BASEURL_PRICEADJUSTOR}/adjustprice`,
        this.priceAdjustorRequests,
        { observe: 'response' }
      )
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse) => {
          if (httpErrorResponse.status == 400) {
            this.messageResponse.message = httpErrorResponse.error.error;
          }
          console.error(
            'Error sending price adjustor requests',
            httpErrorResponse
          );
          return of([]);
        })
      )
      .subscribe((response: any) => {
        this.loadFareRate();
        if (response.status == 200) {
          this.messageResponse.message = 'Success';
        }
      });
  }

  private mapFareRatesToPriceAdjustorRequests(): void {
    this.priceAdjustorRequests = this.fareRates.map((fareRate) => {
      return new PriceAdjustorRequest(
        fareRate.id,
        fareRate.distance,
        fareRate.price,
        fareRate.description
      );
    });
  }
}
