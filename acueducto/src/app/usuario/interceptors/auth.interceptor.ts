import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError(e => {
                //UNAUTHORIZED
               
                if (e.status == 401) {

                    //En caso de que se esté autenticado pero el token ya haya caducado
                    if (this.authService.isAuthenticated()) {
                        this.authService.logout();
                    }

                    this.router.navigate(['/login']);
                }

                //FORBIDDEN
                if (e.status == 403) {
                    console.log('Aquiiiiii vergaaaaa');
                    Swal.fire('Acceso Denegado', `Hola ${this.authService.empleado.usuario} no tienes acceso a este recurso`, 'warning');
                    this.router.navigate(['']);
                }
                return throwError(e);
            })
        );
    }
}