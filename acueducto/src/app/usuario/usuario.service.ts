import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpRequest,HttpHeaders, HttpEvent } from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { Usuario } from './Usuario';
import Swal from 'sweetalert2';
import { Suscriptor } from '../suscriptores/Suscriptor';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Rol } from './roles';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint: string = 'http://localhost:8080/usuarios/';
  private urlEndPointRol: string = 'http://localhost:8080/usuarios/roles';
  constructor(private http: HttpClient, private router: Router) { }

   //Agrega la cabecera del Authorization a los recursos protegidos
  //  private addAuthorizationHeader() {
  //   let token = this.authService.token;
  //   if (token != null) {
  //     return this.httpHeaders.append('Authorization', ' Bearer' + token);
  //   }
  //   return this.httpHeaders;
  // }


  private isNotAuthorized(e): boolean {
    //Si no está autenticado el usuario o no está autorizado para acceder al recurso
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }


  getEmpleados(): Observable<Usuario[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Usuario[])
    );
  }

  create(empleado: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlEndPoint, empleado).pipe(
      map((response: any) => response.empleado as Usuario),
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  delete(cedula: string): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.urlEndPoint}${cedula}`).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getEmpleado(cedula: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlEndPoint}${cedula}`).pipe(
      //Entra cuando hay un NOT_FOUND o INTERNAL_SERVER_ERROR
      catchError(e => {
        this.router.navigate(['/empleados']);
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(empleado: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.urlEndPoint}${empleado.cedula}`, empleado).pipe(
      map((response: any) => response.empleado as Usuario),
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  subirFoto(foto: File, cedula):Observable<HttpEvent<{}>>{
    //Clase nativa de JS para el manejo de archivos
    let formData = new FormData();  
    formData.append("foto", foto);
    formData.append("cedula", cedula);

    //Habilitita seguimiento de progreso de subida
    const req = new HttpRequest('POST', `${this.urlEndPoint}cargarFoto`,formData, {
      reportProgress: true,
    });

    return this.http.request(req).pipe(
      catchError(e =>{
        this.isNotAuthorized(e);
        return throwError(e);
      })
    );
  }


  getRoles(): Observable<Rol[]> {
    return this.http.get(this.urlEndPointRol).pipe(
      map(response => response as Rol[])
    );
  }

}
