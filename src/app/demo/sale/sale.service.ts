import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SaleInterface } from './types/sale-interface';
import { SaleRequestInterface } from './types/sale-request-interface';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  getAllSales(): Observable<SaleInterface[]> {
    return this.http.get<SaleInterface[]>(environment.apiURL + 'sales');
  }

  createSale(saleData: SaleRequestInterface): Observable<SaleInterface> {
    return this.http.post<SaleInterface>(environment.apiURL + 'sales', saleData);
  }
}
