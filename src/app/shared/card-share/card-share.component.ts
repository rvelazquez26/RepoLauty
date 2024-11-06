import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'card-share',
  standalone: true,
  imports: [DialogModule, CommonModule],
  templateUrl: './card-share.component.html',
  styleUrl: './card-share.component.scss'
})
export class CardShareComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  isActiveFacebook = false;
  isActiveInstagram = false;
  isActiveTwitter = false;
  isActiveLink = false;

  toggleSwitchFacebook() {
    this.isActiveFacebook = !this.isActiveFacebook;

    // Solo abrir el enlace si el switch está activo
    if (this.isActiveFacebook) {
      const facebookLink = 'https://www.facebook.com/people/Zatya-Academia/61565196153068/?locale=es_LA';
      setTimeout(() => {
        this.openInNewTab(facebookLink);
        this.closeDialog(); // Cierra el modal después de abrir el enlace
        this.isActiveFacebook = false; // Desactiva el switch de Facebook
      }, 1000);
    }
  }
  toggleSwitchTwitter() {
    this.isActiveTwitter = !this.isActiveTwitter;

    // Solo abrir el enlace si el switch está activo
    if (this.isActiveTwitter) {
      const facebookLink = 'https://x.com/ZatyaAzademia';
      setTimeout(() => {
        this.openInNewTab(facebookLink);
        this.closeDialog(); // Cierra el modal después de abrir el enlace
        this.isActiveTwitter = false; // Desactiva el switch de Facebook
      }, 1000);
    }
  }
  toggleSwitchLink() {
    this.isActiveLink = !this.isActiveLink;

    // Solo abrir el enlace si el switch está activo
    if (this.isActiveLink) {
      const facebookLink = 'https://www.linkedin.com/company/zatya-academia/';
      setTimeout(() => {
        this.openInNewTab(facebookLink);
        this.closeDialog(); // Cierra el modal después de abrir el enlace
        this.isActiveLink = false; // Desactiva el switch de Facebook
      }, 1000);
    }
  }

  toggleSwitchInstagram() {
    this.isActiveInstagram = !this.isActiveInstagram;

    // Solo abrir el enlace si el switch está activo
    if (this.isActiveInstagram) {
      const instagramLink = 'https://www.instagram.com/zatyacademia/?hl=es';
      setTimeout(() => {
        this.openInNewTab(instagramLink);
        this.closeDialog(); // Cierra el modal después de abrir el enlace
        this.isActiveInstagram = false; // Desactiva el switch de Instagram
      }, 1000);
    }
  }

  // Función para abrir un enlace en una nueva pestaña
  openInNewTab(url: string) {
    const newWindow = window.open(url, '_blank');
    if (newWindow) {
      newWindow.focus(); // Asegura que la nueva ventana tenga el foco
    }
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
