import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown'; // Asegúrate de importar el módulo

@Component({
  selector: 'dashboard-card-presentation',
  standalone: true,
  imports: [ButtonModule, FormsModule, DropdownModule],
  templateUrl: './card-presentation.component.html',
  styleUrl: './card-presentation.component.scss'
})
export class CardPresentationComponent {
  courseName: string = '';
  priorKnowledge: string = '';
  public knowledgeLevels: string[] = ['nivel básico', 'nivel intermedio', 'nivel avanzado'];
  public selectedKnowledgeLevel: string | null = null; 
  loading: boolean = false;

  public mappedKnowledgeLevels = this.knowledgeLevels.map(level => ({ label: level, value: level }));

  @Output() filterApplied = new EventEmitter<{ name: string; knowledge: string | null }>();

  searchProducts() {
    this.loading = true; // Activa el loading
    this.filterApplied.emit({ 
      name: this.courseName, 
      knowledge: this.selectedKnowledgeLevel || ''
    });
    console.log(this.courseName, this.selectedKnowledgeLevel);
    
    // Simular una llamada asíncrona (puedes reemplazarlo con tu lógica real)
    setTimeout(() => {
      this.loading = false; // Desactiva el loading después de un tiempo
    }, 2000); // Simular 2 segundos de carga
  }

  clearFilters() {
    this.courseName = '';
    this.selectedKnowledgeLevel = null; // Restablece a null
  }

  canClearFilters(): boolean {
    return this.courseName.trim() !== '' || this.selectedKnowledgeLevel !== null;
}

}
