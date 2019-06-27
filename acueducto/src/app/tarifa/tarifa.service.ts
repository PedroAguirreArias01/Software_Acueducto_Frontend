import { Injectable } from '@angular/core';
import { Observable , throwError} from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Tarifa } from './Tarifa';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {

  
  private urlEndPoint: string = 'http://localhost:8080/tarifas/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router:Router) { }

  get(): Observable<Tarifa[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Tarifa[])
    );
  }

  create(tarifa: Tarifa): Observable<Tarifa> {
    return this.http.post<Tarifa>(this.urlEndPoint, tarifa, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje ,'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Tarifa>{
    return this.http.delete<Tarifa>(`${this.urlEndPoint}${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje ,'error');
        return throwError(e);
      })
    );
  }

  getTarifa(id: number): Observable<Tarifa>{
    return this.http.get<Tarifa>(`${this.urlEndPoint}${id}`, {headers: this.httpHeaders}).pipe(
      //Entra cuando hay un NOT_FOUND o INTERNAL_SERVER_ERROR
      catchError(e => {
        this.router.navigate(['/suscriptores']);
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje ,'error');
        return throwError(e);
      })
    );
  }

  update(tarifa: Tarifa): Observable<Tarifa>{
    return this.http.put<Tarifa>(`${this.urlEndPoint}${tarifa.id}`, tarifa, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje ,'error');
        return throwError(e);
      })
    );
  }
}
