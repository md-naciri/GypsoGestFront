import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { SaleService } from '../sale.service';
import { SaleRequestInterface } from '../types/sale-request-interface';
import { CardComponent } from "../../../theme/shared/components/card/card.component";
import { CommonModule } from '@angular/common';
import { ClientInterface } from '../../client/types/client-interface';
import { ClientService } from '../../client/client.service';

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
  clients: ClientInterface[] = [];
  addSaleForm = this.fb.group({
    date: ['', [Validators.required]],
    clientId: [0, [Validators.required, Validators.pattern('^[0-9]*$')]], // Ensure it's a number
    items: this.fb.array([
      this.createItemFormGroup()
    ])
  });

  constructor(
    private fb: FormBuilder,
    private saleService: SaleService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getAllClients().subscribe(
        (response: any) => {
            // console.log(response);
            if (response && response.data) {
                this.clients = response.data;
                console.log(response.data);
            } else {
                console.log("Invalid client response format");
            }
        },
      (error) => {
        console.log(error.error.error);
      }
    );
  }
  
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




filteredClients: ClientInterface[] = [];

filterClients(event: any): void {
  const searchTerm = event.target.value;
  this.filteredClients = this.clients.filter(client =>
      client.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.LastName.toLowerCase().includes(searchTerm.toLowerCase())
  );
}



selectClient(client: ClientInterface): void {
    this.addSaleForm.get('clientId').patchValue(client.id);
    this.filteredClients = []; // Clear the filtered clients
}


}
