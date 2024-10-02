import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'card-share',
  standalone: true,
  imports: [DialogModule,CommonModule],
  templateUrl: './card-share.component.html',
  styleUrl: './card-share.component.scss'
})
export class CardShareComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  isActiveFacebook = false;
  isActiveInstagram = false;

  toggleSwitchFacebook() {
    this.isActiveFacebook = !this.isActiveFacebook;
  }

  toggleSwitchInstagram() {
    this.isActiveInstagram = !this.isActiveInstagram;
  }
  // Cierra el modal
  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  // Función opcional si quieres manejar algún evento al cerrar
  onClose() {
    this.closeDialog();
  }
}
