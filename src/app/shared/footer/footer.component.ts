import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'shared-footer',
  standalone: true,
  imports: [DividerModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
