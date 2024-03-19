import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginRequestInterface } from '../loginRequest.interface';
import { CommonModule } from '@angular/common';
import { PersistanceService } from '../persistance.service';

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss'],
})
export default class AuthSigninComponent {

  message:string = '';
  constructor(
    private fb: FormBuilder,
    private http:HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
    private persistService: PersistanceService
   ) { }

  formLogin = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required]
  });
  signIn() {
    this.markFormControlsAsTouched(this.formLogin);
    if (this.formLogin.valid) {
      const request: LoginRequestInterface = this.formLogin.getRawValue();
      this.authService.login(request).subscribe(
        (data) => {
          console.log(data);
          this.persistService.set('accessToken', data.token);
          this.persistService.set('name', data.name);

          if(this.persistService.get('accessToken') != null){
            console.log("ook");
            this.router.navigate(['/']);
          }else{
            this.message = 'somthing went wrong';
          }
        },
        (error) => {
          console.log(error.error.error);
          this.message = error.error.error;
        }
      );
    }
  }
  markFormControlsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormControlsAsTouched(control);
      }
    });
  }
  closeAlert():void{
    this.message = '';
  }
}
