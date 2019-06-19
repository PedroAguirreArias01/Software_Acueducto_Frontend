import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Empleado } from './Usuario';
import { UsuarioService } from './usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  private empleados: Empleado[];
  private empleado: Empleado = new Empleado();
  public pageActual: number=1;
  
  constructor(private usuarioService: UsuarioService, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.usuarioService.get().subscribe(
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
}
