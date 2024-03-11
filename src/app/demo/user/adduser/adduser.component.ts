import { Component } from '@angular/core';
import { CardComponent } from "../../../theme/shared/components/card/card.component";
import { FormBuilder,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupRequestInterface } from '../types/signupRequest.interface';
import { AuthService } from '../../pages/authentication/auth.service';
import { PersistanceService } from '../../pages/authentication/persistance.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-adduser',
    standalone: true,
    templateUrl: './adduser.component.html',
    styleUrl: './adduser.component.scss',
    imports: [CommonModule, CardComponent,ReactiveFormsModule]
})
export class AdduserComponent {
    errorMessage:string='';
    successMessage:string='';
    
    addUserForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required]],
        name: ['', [Validators.required, Validators.minLength(3)]],
        role: ['ROLE_USER'],
        password: ['', [Validators.required, Validators.minLength(8)]]
    }); 
    constructor(
        private fb:FormBuilder,
        private authService: AuthService,
        private persistService:PersistanceService,
        private router:Router
        ){}
    roles = [
        { value: 'ROLE_USER' ,  name: 'user'},
        { value: 'ROLE_ADMIN' , name: 'admin'}        
    ]    
    
    
      addUser(){
        this.markFormControlsAsTouched(this.addUserForm);
        console.log(this.addUserForm.value);

        if(this.addUserForm.valid){
            const request: SignupRequestInterface = this.addUserForm.getRawValue();
            this.authService.signup(request).subscribe(
              (data) => {
                if(this.persistService.get('accessToken') != null){
                    this.successMessage = "User has been created successfuly";
                }
              },
              (error) => {
                console.log(error.error.error);
                this.errorMessage = error.error.error;
              }
            );
        }
      }

      markFormControlsAsTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
          control.markAsTouched();
          control.markAsDirty();
      
          if (control instanceof FormGroup) {
            this.markFormControlsAsTouched(control);
          }
        });
      }
      closeSuccessAlert():void{
            this.successMessage ='';
      }
      closeErrorAlert():void{
        this.successMessage ='';
      } 
}
