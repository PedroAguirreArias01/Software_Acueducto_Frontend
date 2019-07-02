import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Event } from "@angular/router";
import { Empleado } from './Usuario';
import { UsuarioService } from './usuario.service';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  private empleados: Empleado[];
  private empleado: Empleado = new Empleado();
  public pageActual: number = 1;

  private fotoSeleccionada: File;
  progreso: number = 0;

  constructor(private usuarioService: UsuarioService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.usuarioService.getEmpleados().subscribe(
      empleados => this.empleados = empleados
    );
  }

  eliminar(empleado: Empleado): void {
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al empleado ${empleado.nombre} ${empleado.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.usuarioService.delete(empleado.cedula).subscribe(
          response => {
            this.empleados = this.empleados.filter(emp => emp !== empleado)
            Swal.fire(
              'Empleado Eliminado!',
              `Empleado ${empleado.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire(
        'Subida de foto',
        'Error: el archivo debe ser de tipo imagen',
        'error'
      )
      this.fotoSeleccionada = null;
    }
    console.log(this.fotoSeleccionada);
  }

  subirFoto() {

    if (!this.fotoSeleccionada) {
      Swal.fire(
        'Subida de foto',
        'Error: Debe seleccionar una foto',
        'error'
      )
    } else {

      this.usuarioService.subirFoto(this.fotoSeleccionada, this.empleado.cedula).subscribe(
        event => {

          //Mira si el tipo de evento es de progreso de subida, si es así calcula el progreso
          //Si no, muestra el mensaje completado
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round(event.loaded / event.total * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.empleado = response.empleado as Empleado;
            Swal.fire(
              'Subida de foto',
              response.mensaje,
              'success'
            )
          }
          // this.empleado = empleado;

        }
      );
    }
  }


}
