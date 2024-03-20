import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientInterface } from './types/client-interface';
import { ClientRequestInterface } from './types/client-request-interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<ClientInterface[]> {
    return this.http.get<ClientInterface[]>(environment.apiURL + 'clients');
  }

  createClient(clientData: ClientRequestInterface): Observable<ClientInterface> {
    return this.http.post<ClientInterface>(environment.apiURL + 'clients', clientData);
  }
  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}clients/${id}`);
  }
  
}
