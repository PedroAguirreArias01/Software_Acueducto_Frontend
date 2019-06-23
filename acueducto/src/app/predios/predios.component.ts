import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Predio } from './Predio';
import { LugarService} from '../lugar/lugar.service';
import {Lugar } from '../lugar/lugar';
import Swal from 'sweetalert2';
import { PredioService } from './predio.service';

@Component({
  selector: 'app-predios',
  templateUrl: './predios.component.html',
  styleUrls: ['./predios.component.css']
})
export class PrediosComponent implements OnInit {
  private predios: Predio[];
  private predio: Predio;
  public pageActual: number=1;
  
  constructor(private predioService: PredioService, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.predioService.get().subscribe(
      predios => this.predios = predios
    );
  }

  eliminar(predio: Predio): void {
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al Predio ${predio.id}?`,
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
        this.predioService.delete(predio.id).subscribe(
          response => {
            this.predios = this.predios.filter(pre => pre !== predio)
            Swal.fire(
              'Predio Eliminado!',
              `Predio ${predio.id} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }
}
