import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //Deja acceder a la ruta si está autenticado
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    let roleStr = next.data['role'] as string;

    let roles = roleStr.split(",");

    for(let role of roles){
      if (this.authService.hasRole(role)) {
        return true;
      }
    }
    
    Swal.fire('Acceso Denegado', `Hola ${this.authService.empleado.usuario} no tienes acceso a este recurso`, 'warning');
    this.router.navigate(['']);

    return false;
  }

}
