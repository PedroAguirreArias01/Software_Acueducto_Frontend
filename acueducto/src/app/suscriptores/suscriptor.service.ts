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

@Injectable({
  providedIn: 'root'
})
export class SuscriptorService {

  private urlEndPoint: string = 'http://localhost:8080/suscriptores/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }

  getSuscriptores(): Observable<Suscriptor[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Suscriptor[])
    );
  }

  create(suscriptor: Suscriptor): Observable<Suscriptor> {
    return this.http.post<Suscriptor>(this.urlEndPoint, suscriptor, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: string): Observable<Suscriptor> {
    return this.http.delete<Suscriptor>(`${this.urlEndPoint}${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getSuscriptor(cedula): Observable<Suscriptor> {
    return this.http.get<Suscriptor>(`${this.urlEndPoint}${cedula}`).pipe(
      //Entra cuando hay un NOT_FOUND o INTERNAL_SERVER_ERROR
      catchError(e => {
        this.router.navigate(['/suscriptores']);
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(suscriptor: Suscriptor): Observable<Suscriptor> {
    return this.http.put<Suscriptor>(`${this.urlEndPoint}${suscriptor.cedula}`, suscriptor, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getPrediosBySuscriptor(cedula: String): Observable<Predio[]> {
    return this.http.get<Predio[]>(`${this.urlEndPoint}${cedula}`+'/predios', { headers: this.httpHeaders });
  }
}
