import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PanelModule,
    FileUploadModule,
    CheckboxModule,
    DividerModule,
    CardModule,
    DropdownModule,
    CommonModule,
  ],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  @ViewChild('fileUpload') fileUpload: any; // Referencia al componente de subida de archivos
  productForm: FormGroup;
  categoryOptions = [
    { id: 1, name: 'En vivo' },
    { id: 2, name: 'Pregrabado' },
    { id: 3, name: 'Presencial' },
  ];
  imageFiles: File[] = [];
  videoFiles: File[] = [];

  public userId = Number(localStorage.getItem('userId'));
  public name = localStorage.getItem('userName');

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      IdType: [null, Validators.required],
      IdUser: [this.userId],
      Professor: [this.name],
      Price: [null],
      Title: ['Titulo', Validators.required],
      Description: ['', Validators.required],
      DescriptionProgram: [''],
      Duration: [''],
      DurationWeek: [''],
      Category: [null, Validators.required],
      KnowledgeLevel: [''],
      Favorite: [false],
      Comprado: [false],
      FilePaths: [[]],
    });
  
    this.productForm.get('Category')?.valueChanges.subscribe((selectedCategoryId) => {
      this.productForm.patchValue({ IdType: selectedCategoryId });
    });
  }

  onFileSelect(event: any) {
    const files: FileList = event.files;
    Array.from(files).forEach((file) => {
      if (file.type === 'video/mp4') {
        this.convertFileToBase64(file).then((base64: string) => {
          this.videoFiles.push(file);
          // Añadir el archivo convertido a base64 al campo Videos en el formulario
          const currentVideos = this.productForm.get('Videos')?.value || [];
          this.productForm.patchValue({ FilePaths: [...currentVideos, base64] });
        });
      } else if (file.type === 'image/png') {
        this.imageFiles.push(file);
      }
    });
    this.fileUpload.clear(); // Reiniciar el componente de subida de archivos
  }

  // Función para convertir un archivo a base64
  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1]; // Obtén solo la parte de base64
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  }  

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files) {
      this.onFileSelect({ files: event.dataTransfer.files });
    }
  }

  preventDefault(event: Event): void {
    event.preventDefault();
  }

  saved() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe(
        (response) => {
          console.log('Producto guardado', response);
        },
        (error) => {
          console.error('Error al guardar el producto', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }

  cancelar() {
    this.router.navigate(['/main/dashboard']);
  }
}
