import { Component, Input, OnInit } from '@angular/core';
import { DebitInterface } from '../types/debit-interface';
import { AccountingService } from '../accounting.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-debit',
  standalone: true,
  imports: [CommonModule, CardComponent, FormsModule],
  templateUrl: './client-debit.component.html',
  styleUrl: './client-debit.component.scss'
})

export class ClientDebitComponent implements OnInit {
  @Input() clientId: number | null = null; // Input to receive specific client ID
  debitData: DebitInterface | null = null;

  constructor(private accountingService: AccountingService) { }

  ngOnInit(): void {
    this.getClientDebit();
  }

  getClientDebit(): void {
    this.accountingService.getClientDebit(this.clientId).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.debitData = response.data;
          console.log(this.debitData);
          
      } else {
        console.log("Invalid debit response format");  
      }},
      (error) => {
        console.log(error.error.error);
      }
    );
  }
}
