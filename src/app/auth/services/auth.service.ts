import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Environment } from '../../../environments/enviroment'
import { Router } from '@angular/router';
import { CustomResponse } from '../../core/interfaces/custom-response.interface';
import { Login } from '../../core/interfaces/auth.interface';
import { jwtDecode } from 'jwt-decode';

//Esto marca la clase como un servicio inyectable en toda la aplicación
@Injectable({
    providedIn: 'root'
  })
  
  export class AuthService {
    private baseUrl = Environment.apiUrl;
    //storageEventListener es una función para escuchar cambios en el almacenamiento local
    private storageEventListener : (event: StorageEvent) => void;


    constructor(private http: HttpClient, private router: Router){
        //handle es el metodo que maneja los eventos de almacenamientos
        //el parametro this, asegura que se ancle a este servicio y asi usar estos metodos
        this.storageEventListener = this.handleStorageEvent.bind(this);
        //window se ejecuta en el context global del navegador[escucha eventos], cuando escucha un evento storage, el navegador
        //ejecuta la función almacenada en this.storageEventListener
        window.addEventListener('storage', this.storageEventListener);//window es el objeto global del navegador, proporciona propiedades 
        //metodos y eventos relacionados con la ventana del navegador
    }

    //Cuando el service se destruye, se elimina el listener para evitar fugas de memoria y 
    //comportamientos inesperados, osea limpiar los recursos utilizados
    ngOnDestroy(){
        window.removeEventListener('storage', this.storageEventListener);
    }

    //Si se detecta un cambio en las claves relevantes, se ejecuta el logout, asegura que el usuario se desconecte
    //si la informacion de autenticacion cambia
    private handleStorageEvent(event: StorageEvent){
        if(event.key === 'authToken'){
            this.logout();
        }
    }

    //Envia un post para autenticar al usuario con sus credenciales, correo y passw, si la autenticación es
    //correcta, almacena la informacion en el almacenamiento local
    login(credentials:{
        mail: string,
        password: string
    }):Observable<CustomResponse<Login>>{//Observable representa un evento a futuro, emite la respuesta del servidor con la estructura de CR<Login>
        const loginUrl = `${this.baseUrl}/api/login`;
        return this.http.post(loginUrl, credentials).pipe(//pipe, permite encadenar operadores rxjs, para agregar funcionalidad a la respuesta
            //tap es un operador de rxjs, a diferencia del subscribe este srive para registros en consola, actualizacion de estado,sin alterar el flujo
            tap((response: any)=>{//En este caso permite guardar datos en el almacenamiento local
                console.log(response);
                if(response){//Verifica si la respuesta incluye un token de autenticación
                    localStorage.setItem('Token', response.tokenResponse.token);
                    localStorage.setItem('userRole', response.userData.role);
                    localStorage.setItem('userName', response.userData.name);
                    localStorage.setItem('userId', response.userData.id);
                }
            })
        );
    }

    //Limpia la info almacenada incluido el token y redirige al inicio de sesion
    logout(){
        localStorage.clear();
        this.router.navigate(['auth/login']);
    }

    //obtiene el token del storage y devuelve null si el token no esta presente
    getToken():string | null {
        return localStorage.getItem('Token');
    }

    //Verifica si el usuario esta autenticado, si el token es válido y no ha expirado
    isLoggedIn():boolean {
        const token = this.getToken();//Obtiene el token
        return token ? !this.isTokenExpired(token) : false;//verifica si expiro usando el isTokenExpired
    }

    isTokenExpired(token:string):boolean {
        try {
            const decoded: any = jwtDecode(token);//Decodifica el token para obtener el contenido
            return decoded.exp < Date.now() / 1000//Compara la fecha de expiracion del token con la fecha actual
            //Si el token es expirado devuelve true
        }
        //si ocurre un error con la deco, o si el token es invalido devuelve true
        catch (error) {
            return true;
        }
    }
  }