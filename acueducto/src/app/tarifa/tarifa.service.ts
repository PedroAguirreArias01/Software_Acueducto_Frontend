import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Tarifa } from './Tarifa';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {

  
  private urlEndPoint: string = 'http://localhost:8080/tarifas/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  get(): Observable<Tarifa[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Tarifa[])
    );
  }

  create(tarifa: Tarifa): Observable<Tarifa> {
    return this.http.post<Tarifa>(this.urlEndPoint, tarifa, { headers: this.httpHeaders });
  }

  delete(id: number): Observable<Tarifa>{
    return this.http.delete<Tarifa>(`${this.urlEndPoint}${id}`, {headers: this.httpHeaders})
  }

  getTarifa(id: number): Observable<Tarifa>{
    return this.http.get<Tarifa>(`${this.urlEndPoint}${id}`, {headers: this.httpHeaders})
  }

  update(tarifa: Tarifa): Observable<Tarifa>{
    return this.http.put<Tarifa>(`${this.urlEndPoint}${tarifa.id}`, tarifa, {headers: this.httpHeaders})
  }

}
