import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Suscriptor } from './Suscriptor';
import Swal from 'sweetalert2';
import { SuscriptorService } from './suscriptor.service';

@Component({
  selector: 'app-suscriptores',
  templateUrl: './suscriptores.component.html',
  styleUrls: ['./suscriptores.component.css']
})

export class SuscriptoresComponent implements OnInit {

  private suscriptores: Suscriptor[];
  private suscriptor: Suscriptor;
  public pageActual: number=1;
  
  constructor(private suscriptorService: SuscriptorService, private router:Router, private activatedRoute: ActivatedRoute) { 
   
  }

  ngOnInit() {
    this.suscriptorService.getSuscriptores().subscribe(
      suscriptores => this.suscriptores = suscriptores
    );
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
            this.suscriptores = this.suscriptores.filter(susc => susc !== suscriptor)
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
}
