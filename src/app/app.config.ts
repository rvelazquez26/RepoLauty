import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './auth/services/auth-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),//necesario para realizar peticiones http 
    //WITH: este metodo permite que los interc definidos en los Dependency Injection sean usados por el client HTTP
    //Cuando se hace una solicitud el interc definido se ejecutan antes de la solicitud
    provideHttpClient(withInterceptorsFromDi()),//nos aseguramos que use el interc definico
    { //Aca se define el D-Injetion, se registra mi servicio como HTTP
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]

};
