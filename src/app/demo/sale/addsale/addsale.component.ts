import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
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
      this.createItemFormGroup()
    ])
  });

  constructor(
    private fb: FormBuilder,
    private saleService: SaleService
  ) {}

  createSale(): void {
    this.markFormControlsAsTouched(this.addSaleForm);
  
    if (this.addSaleForm.valid) {
      console.log(this.addSaleForm.getRawValue());
      
      const items: { quantity: number; unitPrice: number; gypseType: string; }[] = this.addSaleForm.get('items').value.map((item: any) => ({
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        gypseType: item.gypseType
      }));
  
      const request: SaleRequestInterface = {
        date: this.addSaleForm.get('date').value,
        clientId: this.addSaleForm.get('clientId').value,
        items: items
      };
  
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
    this.errorMessage = '';
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      quantity: [0, [Validators.required]],
      unitPrice: [0, [Validators.required]],
      gypseType: ['', [Validators.required]]
    });
  }

  get items(): FormArray {
    return this.addSaleForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.createItemFormGroup());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }
}
