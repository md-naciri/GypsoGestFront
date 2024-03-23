import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../pages/authentication/auth.service';
import { AppUserInterface } from './types/appUser.interface';
import { ConfirmDialogComponent } from '../confirmdialog/confirm.dialog.component';


@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss',
    imports: [CommonModule,CardComponent]
})
export class UserComponent {
  users : AppUserInterface[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(public dialog: MatDialog,private authService:AuthService) {
  }
  ngOnInit():void{
    this.getUsers();
  }
  getUsers():void{
    this.authService.getAllUsers().subscribe(
      (data) => {
        console.log(data);
        this.users = data;
      },
      (error) => {
        console.log(error.error.error);
      }
    );
  }

  deleteUser(username: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this Employee?' // Confirmation message
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.deleteUser(username).subscribe(
          () => {
            // Remove the deleted client from the user array
            this.users = this.users.filter(client => client.username !== username);
            console.log(`Employee with username ${username} deleted successfully.`);
            this.successMessage = "Employee has been deleted successfully";
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
