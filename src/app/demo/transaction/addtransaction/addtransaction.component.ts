import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../transaction.service';
import { TransactionRequestInterface } from '../types/transaction-request-interface';
import { CardComponent } from "../../../theme/shared/components/card/card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addtransaction',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule],
  templateUrl: './addtransaction.component.html',
  styleUrl: './addtransaction.component.scss'
})

export class AddtransactionComponent {
  errorMessage: string = '';
  successMessage: string = '';

  addTransactionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.addTransactionForm = this.fb.group({
      date: ['', [Validators.required]],
      amount: [0, [Validators.required]],
      paymentType: ['', [Validators.required]],
      paymentCode: ['', [Validators.required]],
      clientId: [0, [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  createTransaction(): void {
    this.markFormControlsAsTouched(this.addTransactionForm);

    if (this.addTransactionForm.valid) {
      const request: TransactionRequestInterface = this.addTransactionForm.getRawValue();
      this.transactionService.createTransaction(request).subscribe(
        (data) => {
          this.successMessage = "Transaction has been created successfully";
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
