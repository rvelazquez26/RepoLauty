import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
  ],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentModalComponent {

  visible: boolean = true;
  showCBU: boolean = false;

  @Output() paymentSelected = new EventEmitter<string>();
  @Output() closeModal = new EventEmitter<void>();

  selectPaymentMethod(method: string) {
    if (method === 'Transferencia') {
      this.showCBU = !this.showCBU;
    } else {
      this.showCBU = false;
      this.closeModal.emit();
      this.visible = false;
    }
  }
}
