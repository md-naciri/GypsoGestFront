import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { PersistanceService } from 'src/app/demo/pages/authentication/persistance.service';

@Component({
  selector: 'app-sample-page',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.scss'],
})
export default class SamplePageComponent {
  name: string = '';
  constructor(
    private persistService: PersistanceService
  ) { 
    this.name = this.persistService.get('name') || '';
  }
}
