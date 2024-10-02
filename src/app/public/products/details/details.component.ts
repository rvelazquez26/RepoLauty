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

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CardCertificateComponent, 
    DividerModule, 
    CardModule, 
    TooltipModule, 
    ButtonModule,
    CardShareComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  
  public product? : Product;
  public isDialogVisible: boolean = false;
  
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.currentId.subscribe((id)=>{
      // if(!id){
      //   this.router.navigate(['/not-found]']);
      //   return;
      // }
      this.getProduct("1");
    })
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
}
