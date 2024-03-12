import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../pages/authentication/auth.service';
import { AppUserInterface } from './types/appUser.interface';


@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss',
    imports: [CommonModule,CardComponent]
})
export class UserComponent {
  users : AppUserInterface[] = [];

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
  
}
