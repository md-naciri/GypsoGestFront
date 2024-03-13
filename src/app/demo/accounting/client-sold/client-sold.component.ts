
import { Component, Input, OnInit } from '@angular/core';
import { SoldInterface } from '../types/sold-interface';
import { AccountingService } from '../accounting.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-sold',
  standalone: true,
  imports: [CommonModule, CardComponent, FormsModule],
  templateUrl: './client-sold.component.html',
  styleUrl: './client-sold.component.scss'
})

export class ClientSoldComponent implements OnInit {
  @Input() clientId: number | null = null; // Input to receive specific client ID
  soldData: SoldInterface | null = null;

  constructor(private accountingService: AccountingService) { }

  ngOnInit(): void {
    this.getClientSold();
  }

  getClientSold(): void {
    this.accountingService.getClientSold(this.clientId).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.soldData = response.data;
          console.log(this.soldData);
          
      } else {
        console.log("Invalid sold response format");  
      }},
      (error) => {
        console.log(error.error.error);
      }
    );
  }
}
