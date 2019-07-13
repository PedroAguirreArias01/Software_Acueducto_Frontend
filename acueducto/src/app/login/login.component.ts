import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/Usuario';
import Swal from 'sweetalert2';
import {AuthService} from '../usuario/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public titulo:string ='Por favor, ingrese sus credenciales';

  empleado: Usuario;

  constructor(private authService: AuthService, private router: Router) { 
    this.empleado = new Usuario();
  }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/suscriptores'])
    }
  }

  login(): void{
     console.log(this.empleado);
     if(this.empleado.usuario==null ||this.empleado.contrasena== null){
       Swal.fire('Error','Usuario o contraseña vacías','error');
       return;
     }

     this.authService.login(this.empleado).subscribe(
      response =>{
        console.log(response);

        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);

        let empleado = this.authService.empleado;

        this.router.navigate(['/suscriptores']);
        Swal.fire('Bienvenido',`${empleado.usuario},  has iniciado sesión con éxito`,'success');
      },err =>{
        //Este error se da cuando las credenciales no corresponden a algún usuario registrado
        if(err.status == 400){
          Swal.fire('Error','Usuario o contraseña incorrectos','error');
        }
      }
     );
  }



}
