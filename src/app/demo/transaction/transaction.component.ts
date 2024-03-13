import { Component, OnInit } from '@angular/core';
import { TransactionInterface } from './types/transaction-interface';
import { TransactionService } from './transaction.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';


@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent {
  transactions: TransactionInterface[] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(): void {
    this.transactionService.getAllTransactions().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.transactions = response.data;
          console.log(this.transactions);
          
      } else {
        console.log("Invalid transaction response format");  
      }},
      (error) => {
        console.log(error.error.error);
      }
    );
  }

}
