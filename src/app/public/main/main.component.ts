import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    console.log("main");
    
    if (this.router.url === '/main/product/view') {
      console.log("Product");
      this.scrollToTop();
    } else {
      console.log("Product");
        setTimeout(() => {
          this.scrollToTop();
        }, 200); // Ajusta el tiempo según lo que necesites
    }
}

public scrollToTop() {
  console.log("scroll");

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

}
