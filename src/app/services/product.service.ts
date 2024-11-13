import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../public/interfaces/product.iterface';
import { Environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private baseUrl = Environment.apiUrl;
  private idSource = new BehaviorSubject<string>('');
  public currentId = this.idSource.asObservable();

  constructor(private http: HttpClient) {}

  // Obtener todos los productos (GET)
  getAllProducts(): Observable<Product[]> {
    const mockProducts: Product[] = [
      {
        id: 1,
        IdType: 101,
        IdUser: 1001,
        Professor: 'Juan Perez',
        Price: 100.0,
        Title: 'Curso de Angular',
        Description: 'Curso introductorio de Angular',
        DescriptionProgram: 'Contenido completo del curso',
        Duration: '20 horas',
        DurationWeek: '4 semanas',
        Category: 'Programación',
        KnowledgeLevel: 'Principiante',
        Favorite: false,
        Comprado: false,
        Videos: [
          'data:video/mp4;base64,AAAAGGZ0eXBtcDQyAAAAAGlzb...',
          'data:video/mp4;base64,BBBBGGZ0eXBtcDQyAAAAAGlzb...'
        ], // Ejemplo de videos en formato base64
      },
      {
        id: 2,
        IdType: 102,
        IdUser: 1002,
        Professor: 'Maria Gomez',
        Price: 150.0,
        Title: 'Curso de React',
        Description: 'Curso avanzado de React',
        DescriptionProgram: 'Contenido avanzado del curso',
        Duration: '30 horas',
        DurationWeek: '5 semanas',
        Category: 'Desarrollo Web',
        KnowledgeLevel: 'Intermedio',
        Favorite: true,
        Comprado: true,
        Videos: [
          'data:video/mp4;base64,CCCCGGZ0eXBtcDQyAAAAAGlzb...',
          'data:video/mp4;base64,DDDDGGZ0eXBtcDQyAAAAAGlzb...'
        ], // Ejemplo de videos en formato base64
      },
      {
        id: 1,
        IdType: 101,
        IdUser: 1001,
        Professor: 'Juan Perez',
        Price: 100.0,
        Title: 'Curso de Angular',
        Description: 'Curso introductorio de Angular',
        DescriptionProgram: 'Contenido completo del curso',
        Duration: '20 horas',
        DurationWeek: '4 semanas',
        Category: 'Programación',
        KnowledgeLevel: 'Principiante',
        Favorite: false,
        Comprado: false,
        Videos: [
          'data:video/mp4;base64,AAAAGGZ0eXBtcDQyAAAAAGlzb...',
          'data:video/mp4;base64,BBBBGGZ0eXBtcDQyAAAAAGlzb...'
        ], // Ejemplo de videos en formato base64
      }
    ];
  
    return new Observable<Product[]>((observer) => {
      observer.next(mockProducts);
      observer.complete();
    });
  }
  

  // Obtener producto por ID (GET)
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

addProduct(product: Product): Observable<Product> { 
  console.log(product);
  return this.http.post<Product>(`${this.baseUrl}/api/publication`, product, 
    { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) 
    }); }



  // Eliminar un producto (DELETE)
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/products/${id}`);
  }

  // Actualizar un producto (PUT)
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/products/${product.IdType}`, product, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Método para enlazar un ID
  dataBindindId(id: string) {
    console.log(id);
    this.idSource.next(id);
  }

  // Método para filtrar productos
  filterProducts(name: string, knowledge: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`, {
      params: { name, knowledge }
    });
  }
}
