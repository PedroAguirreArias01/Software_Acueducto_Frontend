import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Suscriptor } from '../suscriptores/Suscriptor';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private urlEndPoint: string = 'http://localhost:8080/suscriptores/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })


  constructor(private http: HttpClient, private router: Router) { }

  
  getSuscriptores(): Observable<Suscriptor[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Suscriptor[])
    );
  }

  suscriptoresMora(): void {
    
  }
}
