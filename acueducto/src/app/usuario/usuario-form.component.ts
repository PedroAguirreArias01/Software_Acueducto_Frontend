import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import { Empleado } from './Usuario';
import { UsuarioService } from './usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  public empleado: Empleado = new Empleado();
  public editar:boolean;

  constructor(private usuarioService: UsuarioService, private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarSuscriptor();
  }

 

  onSubmit() {
    this.crear();
  }

  public crear(): void {
    this.usuarioService.create(this.empleado).
      subscribe(suscriptor => {
        this.router.navigate(['/usuarios'])
        Swal.fire({
          title: 'Nuevo Empleado!',
          text: `Empleado ${suscriptor.nombre} creado con exito`,
          type: 'success',
          confirmButtonText: 'Aceptar'
        })
      }
      )
  }

  cargarSuscriptor(): void{
    this.editar = false;
    this.activatedRoute.params.subscribe(params => {
      let cedula = params['cedula'];
      if(cedula){
        this.editar = true;
        this.usuarioService.getEmpleado(cedula).subscribe(
          (empleado) =>{ this.empleado = empleado
          }
        )
      }
    })
  }

  update(): void {
    this.usuarioService.update(this.empleado).subscribe( empleado => {
      this.router.navigate(['/usuarios'])
      Swal.fire({
        title: 'Actualizar Empleado!',
        text: `Empleado ${empleado.nombre} actualizado con exito`,
        type: 'success',
        confirmButtonText: 'Aceptar'
      })
    })
  }

}
