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
  public filteredProducts: Product[] = [];

  genericProduct = {
    id: null,
    name: 'Curso Genérico',
    price: '0',
    image: 'ruta/a/tu/imagen/generica.png',
    rating: 0,
};

  constructor(private router: Router, private productService: ProductService){}

  
  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products; // Inicializa la lista filtrada
    });
    console.log(this.products);
  }

  applyFilter(filterData: { name: string; knowledge: any }) {
    console.log(filterData);
    
    const { name, knowledge } = filterData;
  
    // Filtramos los productos según el nombre y conocimiento
    this.filteredProducts = this.products.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(name.toLowerCase());
      const matchesKnowledge = product.inventoryStatus.toLowerCase().includes(knowledge.toLowerCase()); // Cambia según tu lógica
  
      return matchesName && matchesKnowledge;
    });
  
    // Definimos el producto genérico
    const genericProduct: Product = {
      id: 0, // Cambia null a un número como 0
      name: 'Curso Genérico',
      price: 0, // Asegúrate de que esto sea un número
      image: 'https://res.cloudinary.com/dgcyvw24o/image/upload/t_asd/v1727848172/aaa_lzx8jg.jpg',
      rating: 0,
      inventoryStatus: 'disponible',
    };
    
    
  
    // Comprobamos cuántos productos hay y agregamos genéricos si es necesario
    const productsCount = this.filteredProducts.length;
    const neededGenericProducts = 4 - productsCount;
  
    // Agregamos tarjetas genéricas si es necesario
    for (let i = 0; i < neededGenericProducts; i++) {
      if (neededGenericProducts > 0) {
        this.filteredProducts.push(genericProduct);
      }
    }
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
