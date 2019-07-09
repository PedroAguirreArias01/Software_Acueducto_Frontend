import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Predio } from './Predio';
import Swal from 'sweetalert2';
import { PredioService } from './predio.service';
import { Suscriptor } from '../suscriptores/Suscriptor';
import { ModalService } from '../usuario/detalle-usuario/modal.service';

@Component({
  selector: 'app-predios',
  templateUrl: './predios.component.html',
  styleUrls: ['./predios.component.css']
})
export class PrediosComponent implements OnInit {
  private predios: Array<Predio> = [];
  private predio: Predio;
  public pageActual: number = 1;
  public prediosFiltrados: Array<Predio> = [];
  private suscriptorSeleccionado: Suscriptor;

  constructor(private predioService: PredioService, private router: Router, private activatedRoute: ActivatedRoute, private modalService: ModalService) { }

  ngOnInit() {
    this.predioService.get().subscribe(
      predios => {
      this.predios = predios
        this.prediosFiltrados = this.predios;
      }
    );
  }

  eliminar(predio: Predio): void {
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al Predio ${predio.numeroMatricula}?`,
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
        this.predioService.delete(predio.numeroMatricula).subscribe(
          response => {
            this.predios = this.predios.filter(pre => pre !== predio)
            Swal.fire(
              'Predio Eliminado!',
              `Predio ${predio.numeroMatricula} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }

  filter(data: string) {
    console.log('sisiissiisisisisisisis')
    if (data) {
      this.prediosFiltrados = this.predios.filter((predio: Predio) => {
        return predio.nombre.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          predio.vereda.nombre.toLowerCase().indexOf(data.toLowerCase()) > -1;
      });
    } else {
      this.prediosFiltrados = this.predios;
    }
  }

//Asigna el cliente seleccionado a la variable suscriptorSeleccionado,
  // luego puede pasarse dicha variable al modal para mostrarse
  abrirModal(suscriptor:Suscriptor):void{
    this.suscriptorSeleccionado = suscriptor;
    this.modalService.abrirModal();
  }

}
