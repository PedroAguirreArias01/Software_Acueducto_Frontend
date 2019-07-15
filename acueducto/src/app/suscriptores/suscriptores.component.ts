import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Suscriptor } from './Suscriptor';
import Swal from 'sweetalert2';
import { SuscriptorService } from './suscriptor.service';
import { ModalService } from './detalle-suscriptor/modal.service';
import { AuthService } from '../usuario/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-suscriptores',
  templateUrl: './suscriptores.component.html',
  styleUrls: ['./suscriptores.component.css']
})

export class SuscriptoresComponent implements OnInit {

  private suscriptores: Array<Suscriptor> = [];
  private suscriptorSeleccionado: Suscriptor;
  public pageActual: number = 1;
  public suscriptoresFiltrados: Array<Suscriptor> = [];

  constructor(private suscriptorService: SuscriptorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private modalService: ModalService) {

  }

  ngOnInit() {
    this.suscriptorService.getSuscriptores().subscribe(
      suscriptores => {
        this.suscriptores = suscriptores
        this.suscriptoresFiltrados = this.suscriptores;
      });
  }

  eliminar(suscriptor: Suscriptor): void {
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al Suscriptor ${suscriptor.nombre} ${suscriptor.apellido}?`,
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
        this.suscriptorService.delete(suscriptor.cedula).subscribe(
          response => {
            
            this.suscriptoresFiltrados = this.suscriptoresFiltrados.filter(susc => susc !== suscriptor)
            Swal.fire(
              'Suscriptor Eliminado!',
              `Suscriptor ${suscriptor.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }

  //Asigna el cliente seleccionado a la variable suscriptorSeleccionado,
  // luego puede pasarse dicha variable al modal para mostrarse
  abrirModal(suscriptor: Suscriptor): void {
    this.suscriptorSeleccionado = suscriptor;
    this.modalService.abrirModal();
  }

  generarReporte():void{
    console.log('holi');
    this.suscriptorService.generarReporte();
  }

  //------------------------filtro de busqueda de suscriptores----------------------
  filter(data: string) {
    if (data) {
      this.suscriptoresFiltrados = this.suscriptores.filter((suscriptor: Suscriptor) => {
        return suscriptor.nombre.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          suscriptor.apellido.toLowerCase().indexOf(data.toLowerCase()) > -1;
      });
    } else {
      this.suscriptoresFiltrados = this.suscriptores;
    }
  }

}
