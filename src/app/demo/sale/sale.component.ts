import { Component, OnInit } from '@angular/core';
import { SaleInterface } from './types/sale-interface';
import { SaleService } from './sale.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})

export class SaleComponent implements OnInit {
  sales: SaleInterface[] = [];

  constructor(private saleService: SaleService) { }

  ngOnInit(): void {
    this.getSales();
  }

  // getSales(): void {
  //   this.saleService.getAllSales().subscribe(
  //     (response: SaleInterface[]) => {
  //       this.sales = response;
  //     },
  //     (error) => {
  //       console.log(error.error.error);
  //     }
  //   );
  // }
  getSales(): void {
    this.saleService.getAllSales().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.sales = response.data;
      } else {
        console.log("Invalid sale response format");  
      }},
      (error) => {
        console.log(error.error.error);
      }
    );
  }
}
