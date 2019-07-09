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
  public municipios: Lugar[];
  public passwordUser: string;

  private minYears: number;
  private minDate: Date;
  private maxDate: Date;

  constructor(private usuarioService: UsuarioService, public lugarService: LugarService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.minYears = 18;
    this.minDate = new Date(1900, 0, 1);
    this.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - this.minYears));
    this.getListaMunicipios();
    if (!this.editar) {
      this.cargarEmpleado();
    }
  }

  onSubmit() {
    this.crearEmpleado();
  }

  public crearEmpleado(): void {
    if (this.passwordUser && this.passwordUser === this.empleado.contrasena) {
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
    } else {
      Swal.fire({
        title: 'Error de contraseña',
        text: `Las Contraseñas deben coincidir`,
        type: 'error',
        confirmButtonText: 'Aceptar'
      })
    }

  }

  cargarEmpleado(): void {
    this.editar = false;
    this.activatedRoute.params.subscribe(params => {
      let cedula = params['cedula'];
      console.log('esta es la cedula del empleado a editar: ' + cedula)
      if (cedula) {
        console.log('if esta es la cedula del empleado a editar: ' + cedula)
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

  getListaMunicipios() {
    this.lugarService.getListaMunicipios().subscribe(
      municipios => this.municipios = municipios
    );
  }

  //o1 -> del *ngFor
  //o2 -> asignado al empleado
  compararMunicipio(o1: Lugar, o2: Lugar) {
    return (o1 == null || o2 == null) ? false : (o1.id === o2.id);
  }

  verificarPass(event: any) {
    this.passwordUser = event.target.value as string;
    if (this.passwordUser && this.passwordUser !== this.empleado.contrasena) {
      Swal.fire({
        title: 'Error de contraseña',
        text: `Las Contraseñas deben coincidir`,
        type: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
  }

}
