import { Component, Input, OnInit } from '@angular/core';
import { CreditInterface } from '../types/credit-interface';
import { AccountingService } from '../accounting.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { FormsModule } from '@angular/forms';
import { ClientInterface } from '../../client/types/client-interface';
import { ClientService } from '../../client/client.service';


@Component({
  selector: 'app-client-credit',
  standalone: true,
  imports: [CommonModule, CardComponent, FormsModule],
  templateUrl: './client-credit.component.html',
  styleUrl: './client-credit.component.scss'
})

export class ClientCreditComponent implements OnInit {
  @Input() clientId: number | null = null; // Input to receive specific client ID
  clients: ClientInterface[] = [];
  creditData: CreditInterface | null = null;

  constructor(private accountingService: AccountingService, private clientService: ClientService) { }

  ngOnInit(): void {
    this.getClientCredit();
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

filteredClients: ClientInterface[] = [];
searchText: string = '';

filterClients(event: any): void {
  const searchTerm = event.target.value;
  if (!searchTerm) {
    this.filteredClients = []; // Clear the filtered clients if the search term is empty
    return;
  }
  this.filteredClients = this.clients.filter(client =>
      client.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.LastName.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

selectClient(client: ClientInterface): void {
  this.clientId = client.id;
  this.searchText = ''; // Clear the search text after selection
  this.filteredClients = []; // Clear the filtered clients
}
}
