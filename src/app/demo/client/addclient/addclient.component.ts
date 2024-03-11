import { Component } from '@angular/core';
import { FormBuilder,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { ClientRequestInterface } from '../types/client-request-interface';
import { CardComponent } from "../../../theme/shared/components/card/card.component";
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-addclient',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule],
  templateUrl: './addclient.component.html',
  styleUrl: './addclient.component.scss'
})

export class AddclientComponent {
  errorMessage: string = '';
  successMessage: string = '';

  addClientForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    cin: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService
  ) {}

  createClient(): void {
    this.markFormControlsAsTouched(this.addClientForm);

    if (this.addClientForm.valid) {
      const request: ClientRequestInterface = this.addClientForm.getRawValue();
      this.clientService.createClient(request).subscribe(
        (data) => {
          this.successMessage = "Client has been created successfully";
        },
        (error) => {
          console.log(error.error.error);
          this.errorMessage = error.error.error;
        }
      );
    }
  }

  markFormControlsAsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();

      if (control instanceof FormGroup) {
        this.markFormControlsAsTouched(control);
      }
    });
  }

  closeSuccessAlert(): void {
    this.successMessage = '';
  }

  closeErrorAlert(): void {
    this.successMessage = '';
  }
}

