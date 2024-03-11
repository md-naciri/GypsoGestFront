import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersistanceService } from './persistance.service';
import { LoginRequestInterface } from './loginRequest.interface';
import { CurrentUserInterface } from './currentUser.interface';
import { SignupRequestInterface } from '../../user/types/signupRequest.interface';
import { AppUserInterface } from '../../user/types/appUser.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private persistanceService: PersistanceService) { }
  token = this.persistanceService.get('accessToken');
  googleToken: string = "";

  private readonly validationUrl = environment.apiUrlAuth + 'validate-token';

  login(data: LoginRequestInterface): Observable<CurrentUserInterface>{
    return this
            .http
            .post<CurrentUserInterface>(environment.apiUrlAuth+'signing',data);
  }
  getAllUsers(): Observable<AppUserInterface[]>{
    return this
            .http
            .get<AppUserInterface[]>(environment.apiURL+'users');
  }
 
  signup(data: SignupRequestInterface): Observable<CurrentUserInterface>{
    return this
            .http
            .post<CurrentUserInterface>(environment.apiUrlAuth+'signup',data);
  }
  isTokenValid(): Observable<boolean> {
    const token = this.persistanceService.get('accessToken'); 
    return this.http.post<boolean>(this.validationUrl, { token: token });
  }
}
