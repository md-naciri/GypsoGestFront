
import { Component, Input, OnInit } from '@angular/core';
import { SoldInterface } from '../types/sold-interface';
import { AccountingService } from '../accounting.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { FormsModule } from '@angular/forms';
import { ClientInterface } from '../../client/types/client-interface';
import { ClientService } from '../../client/client.service';

@Component({
  selector: 'app-client-sold',
  standalone: true,
  imports: [CommonModule, CardComponent, FormsModule],
  templateUrl: './client-sold.component.html',
  styleUrl: './client-sold.component.scss'
})

export class ClientSoldComponent implements OnInit {
  @Input() clientId: number | null = null; // Input to receive specific client ID
  clients: ClientInterface[] = [];
  soldData: SoldInterface | null = null;

  constructor(private accountingService: AccountingService, private clientService: ClientService) { }

  ngOnInit(): void {
    this.getClientSold();
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
