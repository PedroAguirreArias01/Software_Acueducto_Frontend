import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Empleado } from './Usuario';
import { UsuarioService } from './usuario.service';
import Swal from 'sweetalert2';
import { Lugar } from '../lugar/lugar';
import { LugarService } from '../lugar/lugar.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  public empleado: Empleado = new Empleado();
  public editar: boolean;
  public lugares: Lugar[];
  public lugar: Lugar = new Lugar();

  constructor(private usuarioService: UsuarioService, public lugarService: LugarService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.editar) {
      this.cargarUsuario();
    }

    this.lugarService.get().subscribe(
      lugares => this.lugares = lugares
    );
  }

  onSubmit() {
    this.crear();
  }

  public crear(): void {
    console.log(JSON.stringify(this.empleado));
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

  cargarUsuario(): void {
    this.editar = false;
    this.activatedRoute.params.subscribe(params => {
      let cedula = params['cedula'];
      if (cedula) {
        this.editar = true;
        this.usuarioService.getEmpleado(cedula).subscribe(
          (empleado) => {
          this.empleado = empleado
          }
        )
      }
    })
  }

  update(): void {
    this.usuarioService.update(this.empleado).subscribe(empleado => {
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
