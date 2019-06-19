import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Empleado } from './Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint: string = 'http://localhost:8080/empleados/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  get(): Observable<Empleado[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Empleado[])
    );
  }

  create(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.urlEndPoint, empleado, { headers: this.httpHeaders });
  }

  delete(cedula: string): Observable<Empleado>{
    return this.http.delete<Empleado>(`${this.urlEndPoint}${cedula}`, {headers: this.httpHeaders})
  }

  getEmpleado(cedula): Observable<Empleado>{
    return this.http.get<Empleado>(`${this.urlEndPoint}${cedula}`)
  }

  update(empleado: Empleado): Observable<Empleado>{
    return this.http.put<Empleado>(`${this.urlEndPoint}${empleado.cedula}`, empleado, {headers: this.httpHeaders})
  }

}
