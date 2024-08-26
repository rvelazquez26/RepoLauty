import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'dashboard-card-contact-us',
  standalone: true,
  imports: [
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './card-contact-us.component.html',
  styleUrl: './card-contact-us.component.scss'
})
export class CardContactUsComponent {
  value: string = '';
}
