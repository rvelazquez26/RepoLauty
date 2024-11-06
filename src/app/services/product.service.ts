import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../public/interfaces/product.iterface'; // Importar la interfaz Product
import { Environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      image: '../../../../../assets/Recommendation.svg',
      name: 'Manicuria electrica',
      inventoryStatus: 'In Stock',
      price: 29.99,
      rating: 4
    },
    {
      id: 2,
      image: '../../../../../assets/Imagen 8.png',
      name: 'Esmaltado semipermanente',
      inventoryStatus: 'Out of Stock',
      price: 49.99,
      rating: 1
    },
    {
      id: 3,
      image: '../../../../../assets/Imagen 9.png',
      name: 'Anatomía y patologías de la uña',
      inventoryStatus: 'In Stock',
      price: 19.99,
      rating: 4
    },
    {
      id: 4,
      image: '../../../../../assets/Imagen 10.png',
      name: 'Perfeccionamiento en softgel',
      inventoryStatus: 'Low Stock',
      price: 39.99,
      rating: 3
    },
    {
      id: 5,
      image: '../../../../../assets/Recommendation.svg',
      name: 'Product 5',
      inventoryStatus: 'In Stock',
      price: 59.99,
      rating: 5
    }
  ];

  private baseUrl = Environment.apiUrl;
  private idSource = new BehaviorSubject<string>('');
  public currentId = this.idSource.asObservable();

  constructor(private http: HttpClient) {}

  // Obtener todos los productos (GET)
  getAllProducts(): Observable<Product[]> {
    return of(this.products); // Simulación con el mock local
  }

  // Obtener producto por ID (GET)
  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product); // Simulación con el mock local
  }

  // Agregar un nuevo producto (POST)
  addProduct(product: Product): Observable<Product> {
    this.products.push(product); // Simulación con el mock local
    return of(product); // Simulación con el mock local
  }

  // Eliminar un producto (DELETE)
  deleteProduct(id: number): Observable<void> {
    this.products = this.products.filter(p => p.id !== id); // Simulación con el mock local
    return of(); // Simulación con el mock local
  }

  // Actualizar un producto (PUT)
  updateProduct(product: Product): Observable<Product> {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index > -1) {
      this.products[index] = product; // Simulación con el mock local
    }
    return of(product); // Simulación con el mock local
  }
  dataBindindId(id: string){
    console.log(id);
    this.idSource.next(id);
  }

  filterProducts(name: string, knowledge: string): Observable<Product[]> {
    const filteredProducts = this.products.filter(product => 
      product.name.toLowerCase().includes(name.toLowerCase()) &&
      product.inventoryStatus.toLowerCase().includes(knowledge.toLowerCase())
    );
    return of(filteredProducts);
  }

}
