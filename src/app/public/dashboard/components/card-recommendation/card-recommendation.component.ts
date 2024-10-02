import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms'; // Necesario para [(ngModel)]

import { RatingModule } from 'primeng/rating';
import { Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../public/interfaces/product.iterface'; // Importar la interfaz Product


@Component({
  selector: 'card-recommendation',
  standalone: true,
  imports: [ FormsModule, CarouselModule, ButtonModule, TagModule, RatingModule],
  templateUrl: './card-recommendation.component.html',
  styleUrl: './card-recommendation.component.scss'
})
export class CardRecommendationComponent {

  public products: Product[] = [];

  constructor(private router: Router, private productService: ProductService){}

  ngOnInit(){
    this.productService.getAllProducts().subscribe(products => this.products = products);
    console.log(this.products);
    
  }
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  getSeverity(status: string) {
    switch (status) {
      case 'In Stock':
        return 'success';
      case 'Out of Stock':
        return 'danger';
      case 'Low Stock':
        return 'warning';
      default:
        return 'info';
    }
  }

  public viewProduct(id: number){
    this.productService.dataBindindId(id.toString());
    this.router.navigate(['main/product/view']);
    console.log('Ver producto');
  }
  
}
