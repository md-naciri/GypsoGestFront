import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, of, tap } from 'rxjs';
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
  // role = "ROLE_ADMIN"
  // googleToken: string = "";

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
  isRoleValid(): Observable<boolean> {
    // const roleFromStorage = this.persistanceService.get('role');
    // const isValid = roleFromStorage === this.role;
    // return of(isValid);
    const token = this.persistanceService.get('accessToken');
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding and parsing JWT token
    
    // Extract the role directly from the token
    const role: string = decodedToken['roles'];
    const isValid = role === 'ROLE_ADMIN'; // Check if the user has the required role

    // console.log(role);

    
    return of(isValid);
  }
}

