import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CardCategoryComponent } from '../../shared/components/shared-card-category/card-category.component';
import { CardRecommendationComponent } from './components/card-recommendation/card-recommendation.component';
import { CardAboutUsComponent } from './components/card-about-us/card-about-us.component';
import { CardPresentationComponent } from './components/card-presentation/card-presentation.component';
import { CardContactUsComponent } from './components/card-contact-us/card-contact-us.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';



@Component({
  selector: 'public-dashboard',
  standalone: true,
  imports: [
    InputTextModule, 
    CardCategoryComponent, 
    CardRecommendationComponent,
    CardAboutUsComponent,
    CardPresentationComponent,
    CardContactUsComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
