import { Component, Input, OnInit } from '@angular/core';
import { CreditInterface } from '../types/credit-interface';
import { AccountingService } from '../accounting.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-client-credit',
  standalone: true,
  imports: [CommonModule, CardComponent, FormsModule],
  templateUrl: './client-credit.component.html',
  styleUrl: './client-credit.component.scss'
})

export class ClientCreditComponent implements OnInit {
  @Input() clientId: number | null = null; // Input to receive specific client ID
  creditData: CreditInterface | null = null;

  constructor(private accountingService: AccountingService) { }

  ngOnInit(): void {
    this.getClientCredit();
  }

  getClientCredit(): void {
    this.accountingService.getClientCredit(this.clientId).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.creditData = response.data;
          console.log(this.creditData);
          
      } else {
        console.log("Invalid credit response format");  
      }},
      (error) => {
        console.log(error.error.error);
      }
    );
  }
}
