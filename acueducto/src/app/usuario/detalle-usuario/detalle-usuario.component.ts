import { Component, OnInit, Input } from '@angular/core';
import { Empleado } from '../Usuario';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { UsuarioService } from '../usuario.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'detalle-empleado-modal',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit {

  private fotoSeleccionada: File;
  progreso: number = 0;

  @Input() empleado: Empleado;
  constructor(private usuarioService: UsuarioService, private modalService: ModalService) { }

  ngOnInit() {

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

  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }



}
