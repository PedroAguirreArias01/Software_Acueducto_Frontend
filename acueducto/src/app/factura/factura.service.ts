import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Factura } from './Factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private urlEndPoint: string = 'http://localhost:8080/facturas/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  get(): Observable<Factura[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Factura[])
    );
  }

  create(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.urlEndPoint, factura, { headers: this.httpHeaders });
  }

  delete(id: number): Observable<Factura>{
    return this.http.delete<Factura>(`${this.urlEndPoint}${id}`, {headers: this.httpHeaders})
  }

  update(factura: Factura): Observable<Factura>{
    return this.http.put<Factura>(`${this.urlEndPoint}${factura.id}`, factura, {headers: this.httpHeaders})
  }

}
