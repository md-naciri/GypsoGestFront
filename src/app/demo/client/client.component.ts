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

//   getClients(): void {
//     this.clientService.getAllClients().subscribe(
//       (response) => {
//         console.log(response);
//         // Assuming the client data is stored under the 'data' property
//         if (response && response.data) {
//           this.clients = response.data;
//         } else {
//           console.log("Invalid client response format");
//         }
//       },
//       (error) => {
//         console.log(error.error.error);
//       }
//     );
//   }

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
  
}
