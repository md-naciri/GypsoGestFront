// angular import
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PersistanceService } from 'src/app/demo/pages/authentication/persistance.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
})
export class NavRightComponent {
  name: string = '';
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private persistService: PersistanceService
  ) { 
    this.name = this.persistService.get('name') || '';
  }
  logout() {
    // Clear access token from local storage
    this.persistService.remove('accessToken');
    console.log('logout');
    // Redirect to sign-in page
    this.router.navigate(['/auth/signin']);
  }
}
