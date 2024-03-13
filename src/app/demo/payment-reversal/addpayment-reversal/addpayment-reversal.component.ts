import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentReversalService } from '../payment-reversal.service';
import { PaymentReversalRequestInterface } from '../types/payment-reversal-request-interface';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../../../theme/shared/components/card/card.component";

@Component({
  selector: 'app-addpayment-reversal',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule],
  templateUrl: './addpayment-reversal.component.html',
  styleUrl: './addpayment-reversal.component.scss'
})

export class AddpaymentReversalComponent {
  errorMessage: string = '';
  successMessage: string = '';

  addPaymentReversalForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private paymentReversalService: PaymentReversalService
  ) {
    this.addPaymentReversalForm = this.fb.group({
      date: ['', [Validators.required]],
      clientId: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
      paymentCode: ['', [Validators.required]]
    });
  }

  createPaymentReversal(): void {
    this.markFormControlsAsTouched(this.addPaymentReversalForm);

    if (this.addPaymentReversalForm.valid) {
      const request: PaymentReversalRequestInterface = this.addPaymentReversalForm.getRawValue();
      this.paymentReversalService.createPaymentReversal(request).subscribe(
        (data) => {
          this.successMessage = "Payment reversal has been created successfully";
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
    this.errorMessage = '';
  }
}

