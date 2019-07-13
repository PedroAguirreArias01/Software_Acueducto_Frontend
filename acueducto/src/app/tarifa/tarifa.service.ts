import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Tarifa } from './Tarifa';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../usuario/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {


  private urlEndPoint: string = 'http://localhost:8080/tarifas/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  //Agrega la cabecera del Authorization a los recursos protegidos
  // private addAuthorizationHeader() {
  //   let token = this.authService.token;
  //   if (token != null) {
  //     return this.httpHeaders.append('Authorization', 'Bearer ' + token);
  //   }
  //   return this.httpHeaders;
  // }

  // private isNotAuthorized(e): boolean {
  //   //UNAUTHORIZED
  //   if (e.status == 401) {

  //     //En caso de que se esté autenticado pero el token ya haya caducado
  //     if (this.authService.isAuthenticated()) {
  //       this.authService.logout();
  //     }

  //     this.router.navigate(['/login']);
  //     return true;
  //   }

  //   //FORBIDDEN
  //   if (e.status == 403) {
  //     Swal.fire('Acceso Denegado', `Hola ${this.authService.empleado.usuario} no tienes acceso a este recurso`, 'warning');
  //     this.router.navigate(['/suscriptores']);
  //     return true;
  //   }

  //   return false;
  // }

  get(): Observable<Tarifa[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Tarifa[]),
      catchError(e => {
        return throwError(e);
      })
    );
  }

  create(tarifa: Tarifa): Observable<Tarifa> {
    return this.http.post<Tarifa>(this.urlEndPoint, tarifa).pipe(
      map((response: any) => response.tarifa as Tarifa),
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Tarifa> {
    return this.http.delete<Tarifa>(`${this.urlEndPoint}${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  getTarifa(id: number): Observable<Tarifa> {
    return this.http.get<Tarifa>(`${this.urlEndPoint}${id}`).pipe(
      //Entra cuando hay un NOT_FOUND o INTERNAL_SERVER_ERROR
      catchError(e => {

        this.router.navigate(['/tarifas']);
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(tarifa: Tarifa): Observable<Tarifa> {
    return this.http.put<Tarifa>(`${this.urlEndPoint}${tarifa.id}`, tarifa).pipe(
      map((response: any) => response.tarifa as Tarifa),
      catchError(e => {

        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  searchTarifa(term) {
    return this.http.get<Tarifa[]>(`${this.urlEndPoint}search/${term}`);
  }
}
