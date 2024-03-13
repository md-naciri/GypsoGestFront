import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditInterface } from './types/credit-interface';
import { DebitInterface } from './types/debit-interface';
import { SoldInterface } from './types/sold-interface';

@Injectable({
  providedIn: 'root'
})
export class AccountingService {

  constructor(private http: HttpClient) { }

  getClientCredit(clientId: number): Observable<CreditInterface> {
    return this.http.get<CreditInterface>(`${environment.apiURL}accounting/client-credit/${clientId}`);
  }

  getClientDebit(clientId: number): Observable<DebitInterface> {
    return this.http.get<DebitInterface>(`${environment.apiURL}accounting/client-debit/${clientId}`);
  }

  getClientSold(clientId: number): Observable<SoldInterface> {
    return this.http.get<SoldInterface>(`${environment.apiURL}accounting/client-total/${clientId}`);
  }
}
