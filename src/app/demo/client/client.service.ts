import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersistanceService } from '../pages/authentication/persistance.service';
import { ClientInterface } from './types/client-interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private persistanceService: PersistanceService) { }

  getAllClients(): Observable<ClientInterface[]> {
    return this.http.get<ClientInterface[]>(environment.apiURL + 'clients');
  }
}
