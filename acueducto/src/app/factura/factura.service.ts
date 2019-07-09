import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, catchError } from 'rxjs/operators';
import { Factura } from './Factura';
import { Predio } from '../predios/Predio';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private urlEndPoint: string = 'http://localhost:8080/facturas/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }

  getfacturas(): Observable<Factura[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Factura[])
    );
  }

  create(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.urlEndPoint, factura, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Factura> {
    return this.http.delete<Factura>(`${this.urlEndPoint}${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(factura: Factura): Observable<Factura> {
    return this.http.put<Factura>(`${this.urlEndPoint}${factura.id}`, factura, { headers: this.httpHeaders })
  }


  getFactura(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.urlEndPoint}${id}`, { headers: this.httpHeaders }).pipe(
      //Entra cuando hay un NOT_FOUND o INTERNAL_SERVER_ERROR
      catchError(e => {
        this.router.navigate(['/facturas']);
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  subirArchivo(archivo: File):Observable<HttpEvent<{}>>{
    //Clase nativa de JS para el manejo de archivos
    let formData = new FormData();  
    formData.append("archivo", archivo);
    //Habilita seguimiento de progreso de subida
    const req = new HttpRequest('POST', `${this.urlEndPoint}/generarFacturas`,formData, {
      reportProgress: true
    });
    return this.http.request(req);
  }

}
