import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CardCategoryComponent } from '../../shared/shared-card-category/card-category.component';
import { CardRecommendationComponent } from './components/card-recommendation/card-recommendation.component';
import { CardAboutUsComponent } from './components/card-about-us/card-about-us.component';
import { CardPresentationComponent } from './components/card-presentation/card-presentation.component';
import { CardContactUsComponent } from './components/card-contact-us/card-contact-us.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../auth/services/auth.service';


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
    FooterComponent,
    RouterOutlet,
    ButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  isLogged: boolean = false

  constructor(private authService: AuthService,private router: Router){}

  ngOnInit(): void {
    
    if (!this.authService.isLoggedIn()) {
      this.isLogged = false;
      console.log(this.isLogged);
    }
    else{
      this.isLogged = true;
      console.log(this.isLogged);
    }
  }

  addProduct(){
    this.router.navigate(['main/product/add']);
  }
}
