import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'dashboard-card-presentation',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './card-presentation.component.html',
  styleUrl: './card-presentation.component.scss'
})
export class CardPresentationComponent {

}
