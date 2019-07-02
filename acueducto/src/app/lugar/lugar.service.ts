import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Lugar } from './Lugar'
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LugarService {
  private urlEndPoint: string = 'http://localhost:8080/lugares/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  get(): Observable<Lugar[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Lugar[])
    );
  }

  create(lugar: Lugar): Observable<Lugar> {
    return this.http.post<Lugar>(this.urlEndPoint, lugar, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Lugar> {
    return this.http.delete<Lugar>(`${this.urlEndPoint}${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getLugar(id: number): Observable<Lugar> {
    return this.http.get<Lugar>(`${this.urlEndPoint}${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(lugar: Lugar): Observable<Lugar> {
    return this.http.put<Lugar>(`${this.urlEndPoint}${lugar.id}`, lugar, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getListaMunicipios(): Observable<Lugar[]> {
    return this.http.get(this.urlEndPoint + 'tipo/M').pipe(
      map(response => response as Lugar[])
    );
  }

  getListaVeredas(): Observable<Lugar[]> {
    return this.http.get<Lugar[]>(this.urlEndPoint + 'tipo/V').pipe(
      map(response => response as Lugar[])
    );
  }
}
