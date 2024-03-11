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
  // isCollapsed = true;
  // multiCollapsed1 = true;
  // multiCollapsed2 = true;
  // loremText =
  //   "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.";
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
