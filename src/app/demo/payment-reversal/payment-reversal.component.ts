import { Component, OnInit } from '@angular/core';
import { PaymentReversalInterface } from './types/payment-reversal-interface';
import { PaymentReversalService } from './payment-reversal.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
@Component({
  selector: 'app-payment-reversal',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './payment-reversal.component.html',
  styleUrl: './payment-reversal.component.scss'
})

export class PaymentReversalComponent {
  paymentReversals: PaymentReversalInterface[] = [];

  constructor(private paymentReversalService: PaymentReversalService) { }

  ngOnInit(): void {
    this.getPaymentReversals();
  }

  getPaymentReversals(): void {
    this.paymentReversalService.getAllPaymentReversals().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.paymentReversals = response.data;
          console.log(this.paymentReversals);
        } else {
          console.log("Invalid payment reversal response format");  
        }
      },
      (error) => {
        console.log(error.error.error);
      }
    );
  }
}
