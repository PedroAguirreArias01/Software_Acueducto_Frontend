import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, catchError } from 'rxjs/operators';
import { Predio } from './Predio';
import { Lugar } from '../lugar/lugar';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PredioService {

  private urlEndPoint: string = 'http://localhost:8080/predios/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  get(): Observable<Predio[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Predio[])
    );
  }

  create(predio: Predio): Observable<Predio> {
    return this.http.post<Predio>(this.urlEndPoint, predio, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  delete(numeroMatricula: string): Observable<Predio> {
    return this.http.delete<Predio>(`${this.urlEndPoint}${numeroMatricula}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getPredio(numeroMatricula: string): Observable<Predio> {
    return this.http.get<Predio>(`${this.urlEndPoint}${numeroMatricula}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(predio: Predio): Observable<Predio> {
    return this.http.put<Predio>(`${this.urlEndPoint}${predio.numeroMatricula}`, predio, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  searchPredios(term) {
    return this.http.get<Predio[]>(`${this.urlEndPoint}search/${term}`);
  }
}
