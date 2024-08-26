import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

bootstrapApplication(AppComponent, {
  ...appConfig, // Expande la configuración existente
  providers: [
    ...appConfig.providers || [], // Asegúrate de incluir los providers existentes
    provideAnimations(),
    MessageService
  ]
}).catch((err) => console.error(err));
