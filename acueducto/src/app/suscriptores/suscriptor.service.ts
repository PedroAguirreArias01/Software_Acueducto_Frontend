import { Injectable } from '@angular/core';
import { Suscriptor } from './Suscriptor';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuscriptorService {

  private urlEndPoint: string = 'http://localhost:8080/suscriptores/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getSuscriptores(): Observable<Suscriptor[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Suscriptor[])
    );
  }

  create(suscriptor: Suscriptor): Observable<Suscriptor> {
    return this.http.post<Suscriptor>(this.urlEndPoint, suscriptor, { headers: this.httpHeaders });
  }

  delete(id: string): Observable<Suscriptor>{
    return this.http.delete<Suscriptor>(`${this.urlEndPoint}${id}`, {headers: this.httpHeaders})
  }

  getSuscriptor(cedula): Observable<Suscriptor>{
    return this.http.get<Suscriptor>(`${this.urlEndPoint}${cedula}`)
  }

  update(suscriptor: Suscriptor): Observable<Suscriptor>{
    return this.http.put<Suscriptor>(`${this.urlEndPoint}${suscriptor.cedula}`, suscriptor, {headers: this.httpHeaders})
  }

}
