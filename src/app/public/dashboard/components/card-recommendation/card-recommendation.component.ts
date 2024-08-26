import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms'; // Necesario para [(ngModel)]

import { RatingModule } from 'primeng/rating';


@Component({
  selector: 'card-recommendation',
  standalone: true,
  imports: [ FormsModule, CarouselModule, ButtonModule, TagModule, RatingModule],
  templateUrl: './card-recommendation.component.html',
  styleUrl: './card-recommendation.component.scss'
})
export class CardRecommendationComponent {
  products = [
    {
      image: '../../../../../assets/Recommendation.svg',
      name: 'Manicuria electrica',
      inventoryStatus: 'In Stock',
      price: 29.99,
      rating: 4
    },
    {
      image: '../../../../../assets/Imagen 8.png',
      name: 'Esmaltado semipermanente ',
      inventoryStatus: 'Out of Stock',
      price: 49.99,
      rating: 1
    },
    {
      image: '../../../../../assets/Imagen 9.png',
      name: 'Anatomía y patologías de la uña',
      inventoryStatus: 'In Stock',
      price: 19.99,
      rating: 4
    },
    {
      image: '../../../../../assets/Imagen 10.png',
      name: 'Perfeccionamiento en softgel',
      inventoryStatus: 'Low Stock',
      price: 39.99,
      rating: 3
    },
    {
      image: '../../../../../assets/Recommendation.svg',
      name: 'Product 5',
      inventoryStatus: 'In Stock',
      price: 59.99,
      rating: 5
    }
  ];

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
}
