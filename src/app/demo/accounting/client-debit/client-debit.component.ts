import { Component, Input, OnInit } from '@angular/core';
import { DebitInterface } from '../types/debit-interface';
import { AccountingService } from '../accounting.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { FormsModule } from '@angular/forms';
import { ClientInterface } from '../../client/types/client-interface';
import { ClientService } from '../../client/client.service';

@Component({
  selector: 'app-client-debit',
  standalone: true,
  imports: [CommonModule, CardComponent, FormsModule],
  templateUrl: './client-debit.component.html',
  styleUrl: './client-debit.component.scss'
})

export class ClientDebitComponent implements OnInit {
  @Input() clientId: number | null = null; // Input to receive specific client ID
  clients: ClientInterface[] = [];
  debitData: DebitInterface | null = null;

  constructor(private accountingService: AccountingService, private clientService: ClientService) { }

  ngOnInit(): void {
    this.getClientDebit();
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
