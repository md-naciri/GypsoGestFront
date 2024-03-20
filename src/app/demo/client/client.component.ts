import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientInterface } from './types/client-interface';
import { ClientService } from './client.service';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../confirmdialog/confirm.dialog.component'; // Import the confirmation dialog component

@Component({
  selector: 'app-client',
  standalone: true,
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  imports: [CommonModule,CardComponent]
})
export class ClientComponent implements OnInit {
  clients: ClientInterface[] = [];
  errorMessage: string = '';
  successMessage: string = '';

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

    // deleteClient(id: number): void {
    //   this.clientService.deleteClient(id).subscribe(
    //     () => {
    //       // Remove the deleted client from the clients array
    //       this.clients = this.clients.filter(client => client.id !== id);
    //       console.log(`Client with ID ${id} deleted successfully.`);
    //       this.successMessage = "Client has been deleted successfully";
    //     },
    //     (error) => {
    //       this.errorMessage = error.error.error;
    //     }
    //   );
    // }
    deleteClient(id: number): void {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: 'Are you sure you want to delete this client?' // Confirmation message
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.clientService.deleteClient(id).subscribe(
            () => {
              // Remove the deleted client from the clients array
              this.clients = this.clients.filter(client => client.id !== id);
              console.log(`Client with ID ${id} deleted successfully.`);
              this.successMessage = "Client has been deleted successfully";
            },
            (error) => {
              this.errorMessage = error.error.error;
            }
          );
        }
      });
    }
    
    closeSuccessAlert(): void {
      this.successMessage = '';
    }
  
    closeErrorAlert(): void {
      this.successMessage = '';
    }
  
}
