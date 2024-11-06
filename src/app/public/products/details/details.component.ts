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
import { AuthService } from '../../../auth/services/auth.service';  // Importa AuthService
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../../services/toast.service';



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
    ToastModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  images: string[] = [
    '../../../../assets/images/Imagen1.jpeg',
    '../../../../assets/images/Imagen2.jpeg',
    '../../../../assets/images/Imagen3.jpeg',
    '../../../../assets/images/Imagen4.jpeg',
    '../../../../assets/images/Imagen5.jpeg',
    '../../../../assets/images/Imagen6.jpeg',
    '../../../../assets/images/Imagen7.jpeg'
  ];

  randomImages: string[] = [];

  displayModal: boolean = false; // Controla si el modal está abierto o cerrado
  selectedImage: string | null = null; // Guarda la imagen seleccionada
  
  public product? : Product;
  public isDialogVisible: boolean = false;
  public showAuthModal: boolean = false; 
  
  constructor(
    private productService: ProductService,
    private router: Router,
    private authService: AuthService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.productService.currentId.subscribe((id)=>{
      // if(!id){
      //   this.router.navigate(['/not-found]']);
      //   return;
      // }
      this.getProduct("1");
      this.getRandomImages(4);
      this.scrollToTop();
    })
  }

  public scrollToTop() {
    console.log("scroll");
  
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
    const shuffled = [...this.images].sort(() => 0.5 - Math.random()); // Mezcla las imágenes
    this.randomImages = shuffled.slice(0, count); // Selecciona 'count' imágenes al azar
  }

  showImage(image: string): void {
    this.selectedImage = image; // Establece la imagen seleccionada
    this.displayModal = true; // Abre el modal
  }
    getProduct(id: string) {
      this.productService.getProductById(Number(id)).subscribe({
        next: (resp) => {
          console.log(resp);
          this.product = resp;
        },
        error: (error) => {
          console.error('Error:', error);
        }
      })

    }

    showDialog() {
      this.isDialogVisible = true;
    }

      // Función para manejar el clic en "Comprar"
      onBuyClick() {
        if (!this.authService.isLoggedIn()) {
          this.showAuthModal = true;
        } else {
          this.toast.showSuccess('Su producto se añadio al carrito de compras correctamente');
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
