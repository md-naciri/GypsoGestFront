import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TransactionInterface } from './types/transaction-interface';
import { TransactionRequestInterface } from './types/transaction-request-interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getAllTransactions(): Observable<TransactionInterface[]> {
    return this.http.get<TransactionInterface[]>(environment.apiURL + 'transactions');
  }

  createTransaction(saleData: TransactionRequestInterface): Observable<TransactionInterface> {
    return this.http.post<TransactionInterface>(environment.apiURL + 'transactions', saleData);
  }
}
