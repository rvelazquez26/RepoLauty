import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

//Este servicio esta vinculado con el auth-service para interceptar las solicitudes HTTP y manipularlas antes
//de que lleguen al servidor o cuando el servidor responde

@Injectable({
    providedIn: 'root'
  })
  
  export class AuthInterceptor {
    //AuthService es inyectado para acceder al token y realizar el cierre de sesion si es necesario
    constructor(private authService: AuthService, private route: Router){}

    //La funcion de este metodo es interceptar las solicitudes http
    intercept(
        req: HttpRequest<any>,//Este parametro(objeto) es la solicitud original, el tipo HttpRequest<any> indica que puede ser cualquier solicitud
        next: HttpHandler//Es un objeto del tipo Handler, maneja la solicitud despues de que el intercetor la haya modificado
    ): Observable<HttpEvent<any>> {//Esto emitira un evento de cualquier tipo, desde envios de solicitud hasta la 
        //recepcion completa de la respuesta
    //RESUMEN: Intercepta la solicitud antes que se envie, la modifica, la procesa(next) y maneja la respuesta
    //se obtiene el token
    const token = this.authService.getToken();
    let request = req;
    if(token){
        //Se clona la solicitud HTTP original ya que esta es inmutable, significa que no se pueden modificar directamente 
        request = req.clone({
            setHeaders:{ 
                authorization: `${token}`,//se agrega el token como encabezado
            },
        });
    }
    //Aca le pasa la solicitud modificada o sin modificar al proximo manejador
    //Next  toma la solicitud y la pasa al servidor
    return next.handle(request).pipe( //request es la solicitud que contiene el token
        //catch es un operador que captura errores
        catchError((error: HttpErrorResponse) => { //a la respuesta se le aplica el operador catchError para
            if(error.status === 401){              //interceptar errores y manejarlos adecuadamente
                this.authService.logout();
                this.route.navigate(['auth/login']);
                //si el servidor responde con un 401 es que el token es invalido o a expirado
            }
            else if(error.status === 403){
                alert ('Acceso denegado');
                //el usuario no tiene permiso para acceder al recurso.
            }
            return throwError(error);
        })
    );
  }
}