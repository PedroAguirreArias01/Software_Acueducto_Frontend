import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime } from 'rxjs/operators';
import { Predio } from './Predio';

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
    return this.http.post<Predio>(this.urlEndPoint, predio, { headers: this.httpHeaders });
  }

  delete(numeroMatricula: string): Observable<Predio> {
    return this.http.delete<Predio>(`${this.urlEndPoint}${numeroMatricula}`, { headers: this.httpHeaders })
  }

  getPredio(numeroMatricula: string): Observable<Predio> {
    return this.http.get<Predio>(`${this.urlEndPoint}${numeroMatricula}`, { headers: this.httpHeaders })
  }

  update(predio: Predio): Observable<Predio> {
    return this.http.put<Predio>(`${this.urlEndPoint}${predio.numeroMatricula}`, predio, { headers: this.httpHeaders })
  }

  search(term) {
    var predios = this.http.get(`${this.urlEndPoint}` + 'search/' + term)
      .pipe(
        debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
        map(
          (data: any) => {
            return (
              data.length != 0 ? data as Predio[] : [{ "BookName": "No Record Found" } as any]
            );
          }
        ));
    return predios;
  }
}
