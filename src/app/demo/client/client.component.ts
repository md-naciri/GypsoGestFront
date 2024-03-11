import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientInterface } from './types/client-interface';
import { ClientService } from './client.service';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client',
  standalone: true,
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  imports: [CommonModule,CardComponent]
})
export class ClientComponent implements OnInit {
  clients: ClientInterface[] = [];

  constructor(public dialog: MatDialog, private clientService: ClientService) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getAllClients().subscribe(
      (data) => {
        console.log(data);
        this.clients = data;
      },
      (error) => {
        console.log(error.error.error);
      }
    );
  }
}
