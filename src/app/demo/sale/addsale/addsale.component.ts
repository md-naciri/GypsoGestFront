import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SaleService } from '../sale.service';
import { SaleRequestInterface } from '../types/sale-request-interface';
import { CardComponent } from "../../../theme/shared/components/card/card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addsale',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule],
  templateUrl: './addsale.component.html',
  styleUrls: ['./addsale.component.scss']
})

export class AddsaleComponent {
  errorMessage: string = '';
  successMessage: string = '';

  addSaleForm = this.fb.group({
    date: ['', [Validators.required]],
    clientId: [0, [Validators.required, Validators.pattern('^[0-9]*$')]], // Ensure it's a number
    items: this.fb.array([
      this.fb.group({
        quantity: [0, [Validators.required]], // Change default value to 0 or remove it if not needed
        unitPrice: [0, [Validators.required]], // Change default value to 0 or remove it if not needed
        gypseType: ['', [Validators.required]]
      })
    ])
  });
  

  constructor(
    private fb: FormBuilder,
    private saleService: SaleService
  ) {}

  createSale(): void {
    this.markFormControlsAsTouched(this.addSaleForm);

    if (this.addSaleForm.valid) {
      const request: SaleRequestInterface = this.addSaleForm.getRawValue();
      this.saleService.createSale(request).subscribe(
        (data) => {
          this.successMessage = "Sale has been created successfully";
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
