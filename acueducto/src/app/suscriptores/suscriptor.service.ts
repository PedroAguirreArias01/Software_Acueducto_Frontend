import { Injectable } from '@angular/core';
import { Suscriptor } from './Suscriptor';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Predio } from '../predios/Predio';
import { Factura } from '../factura/Factura';
import { formatDate } from '@angular/common';
import { AuthService } from '../usuario/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SuscriptorService {

  private urlEndPoint: string = 'http://localhost:8080/suscriptores/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  //Agrega la cabecera del Authorization a los recursos protegidos
  private addAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }


  private isNotAuthorized(e): boolean {
    //UNAUTHORIZED
    if (e.status == 401) {

      //En caso de que se esté autenticado pero el token ya haya caducado
      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }

      this.router.navigate(['/login']);
      return true;
    }

    //FORBIDDEN
    if (e.status == 403) {
      Swal.fire('Acceso Denegado', `Hola ${this.authService.empleado.usuario} no tienes acceso a este recurso`, 'warning');
      this.router.navigate(['/suscriptores']);
      return true;
    }

    return false;
  }

  getSuscriptores(): Observable<Suscriptor[]> {
    return this.http.get(this.urlEndPoint, { headers: this.addAuthorizationHeader() }).pipe(
      map(response => response as Suscriptor[]),
      catchError(e => {
        this.isNotAuthorized(e);
        return throwError(e);
      })
    );
  }

  create(suscriptor: Suscriptor): Observable<Suscriptor> {
    return this.http.post(this.urlEndPoint, suscriptor, { headers: this.addAuthorizationHeader() }).pipe(
      map((response: any) => response.suscriptor as Suscriptor),
      catchError(e => {

        if (this.isNotAuthorized(e)) {
          return throwError(e);
        }

        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: string): Observable<Suscriptor> {
    return this.http.delete<Suscriptor>(`${this.urlEndPoint}${id}`, { headers: this.addAuthorizationHeader()}).pipe(
      catchError(e => {

        if (this.isNotAuthorized(e)) {
          return throwError(e);
        }

        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getSuscriptor(cedula): Observable<Suscriptor> {
    return this.http.get<Suscriptor>(`${this.urlEndPoint}${cedula}`, { headers: this.addAuthorizationHeader() }).pipe(
      //Entra cuando hay un NOT_FOUND o INTERNAL_SERVER_ERROR
      catchError(e => {

        if (this.isNotAuthorized(e)) {
          return throwError(e);
        }

        this.router.navigate(['/suscriptores']);
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(suscriptor: Suscriptor): Observable<Suscriptor> {
    return this.http.put<Suscriptor>(`${this.urlEndPoint}${suscriptor.cedula}`, suscriptor, { headers: this.addAuthorizationHeader() }).pipe(
      map((response: any) => response.suscriptor as Suscriptor),
      catchError(e => {
        if (this.isNotAuthorized(e)) {
          console.log("aqui");
          return throwError(e);
        }
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getPrediosBySuscriptor(cedula: String): Observable<Predio[]> {
    return this.http.get<Predio[]>(`${this.urlEndPoint}${cedula}` + '/predios', { headers: this.addAuthorizationHeader() }).pipe(
      map(response => response as Predio[])
    );
  }
}
