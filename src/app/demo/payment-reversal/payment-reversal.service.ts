import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentReversalInterface } from './types/payment-reversal-interface';
import { PaymentReversalRequestInterface } from './types/payment-reversal-request-interface';


@Injectable({
  providedIn: 'root'
})
export class PaymentReversalService {

  constructor(private http: HttpClient) { }

  getAllPaymentReversals(): Observable<PaymentReversalInterface[]> {
    return this.http.get<PaymentReversalInterface[]>(environment.apiURL + 'returneds');
  }

  createPaymentReversal(reversalData: PaymentReversalRequestInterface): Observable<PaymentReversalInterface> {
    return this.http.post<PaymentReversalInterface>(environment.apiURL + 'returneds', reversalData);
  }
}
