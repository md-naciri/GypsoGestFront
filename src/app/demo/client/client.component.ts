import { Component } from '@angular/core';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-client',
    standalone: true,
    templateUrl: './client.component.html',
    styleUrl: './client.component.scss',
    imports: [CommonModule, CardComponent]
})
export class ClientComponent {

}
