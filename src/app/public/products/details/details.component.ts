import { Component } from '@angular/core';
import { CardCertificateComponent } from '../../dashboard/components/card-certificate/card-certificate.component';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/product.iterface';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { CardShareComponent } from '../../../shared/card-share/card-share.component';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'primeng/carousel';
import { AuthService } from '../../../auth/services/auth.service'; // Importa AuthService
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../../services/toast.service';
import { PaymentModalComponent } from '../components/paymentModal/payment.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CardCertificateComponent,
    DividerModule,
    CardModule,
    TooltipModule,
    ButtonModule,
    CardShareComponent,
    DialogModule,
    CarouselModule,
    ToastModule,
    PaymentModalComponent,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  images: string[] = [
    '../../../../assets/images/Imagen1.jpeg',
    '../../../../assets/images/Imagen2.jpeg',
    '../../../../assets/images/Imagen3.jpeg',
    '../../../../assets/images/Imagen4.jpeg',
    '../../../../assets/images/Imagen5.jpeg',
    '../../../../assets/images/Imagen6.jpeg',
    '../../../../assets/images/Imagen7.jpeg',
  ];

  randomImages: string[] = [];

  displayModal: boolean = false; 
  selectedImage: string | null = null; 

  public product?: Product;
  public idPublicacion?: number;
  public isDialogVisible: boolean = false;
  public showAuthModal: boolean = false;
  public showPaymentModal: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private authService: AuthService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.productService.currentId.subscribe((id) => {
      if(!id){
        this.router.navigate(['/not-found]']);
        return;
      }
      this.idPublicacion = Number(id);
      this.getProduct('1');
      this.getRandomImages(4);
      this.scrollToTop();
    });
  }

  public scrollToTop() {
    console.log('scroll');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showDialog1() {
    this.displayModal = true;
  }

  hideDialog() {
    this.displayModal = false;
  }

  getRandomImages(count: number): void {
    this.randomImages = [];
    const shuffled = [...this.images].sort(() => 0.5 - Math.random());
    this.randomImages = shuffled.slice(0, count); 
  }

  showImage(image: string): void {
    this.selectedImage = image;
    this.displayModal = true;
  }
  getProduct(id: string) {
    this.productService.getProductById(Number(id)).subscribe({
      next: (resp) => {
        console.log(resp);
        this.product = resp;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  showDialog() {
    this.isDialogVisible = true;
  }

  onBuyClick() {
    if (!this.authService.isLoggedIn()) {
      this.showAuthModal = true;
    } else {
      this.showPaymentModal = true;
    }
  }

  onPaymentSelected(method: string) {
    console.log(method);
    
    if (method == 'MercadoPago') {
        this.productService.createPaymentPreference(this.idPublicacion!).subscribe(
          (response) => {
            const preferenceId = response.preferenceId;
        
        if (preferenceId) {
          const mpUrl = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`;
          window.location.href = mpUrl;
        }
          },
          (error) => {
            console.error('Error al crear la preferencia de pago:', error);
          }
        );
    }
  }
  

  onAddToFavoritesClick() {
    if (!this.authService.isLoggedIn()) {
      this.showAuthModal = true;
    } else {
      // Lógica para añadir a favoritos
      this.toast.showSuccess('Su producto se añadio a favoritos correctamente');
      console.log('Añadido a favoritos');
    }
  }

  goToLogin() {
    this.router.navigate(['auth/login']); // Redirige al login
  }
}
