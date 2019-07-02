import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Empleado } from './Usuario';
import Swal from 'sweetalert2';
import { Suscriptor } from '../suscriptores/Suscriptor';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint: string = 'http://localhost:8080/empleados/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Empleado[])
    );
  }

  create(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.urlEndPoint, empleado, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.empleado as Empleado),
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  delete(cedula: string): Observable<Empleado> {
    return this.http.delete<Empleado>(`${this.urlEndPoint}${cedula}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getEmpleado(cedula: string): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.urlEndPoint}${cedula}`).pipe(
      //Entra cuando hay un NOT_FOUND o INTERNAL_SERVER_ERROR
      catchError(e => {
        this.router.navigate(['/empleados']);
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.urlEndPoint}${empleado.cedula}`, empleado, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.empleado as Empleado),
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

}
