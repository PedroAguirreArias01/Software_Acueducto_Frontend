import { Component, OnInit } from '@angular/core';
import { Lugar } from './lugar';
import { LugarService } from './lugar.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.component.html',
  styleUrls: ['./lugar.component.css']
})
export class LugarComponent implements OnInit {

  private lugares: Lugar[];
  private lugar: Lugar;
  public pageActual: number=1;
  
  constructor(private lugarService: LugarService, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.lugarService.get().subscribe(
      lugares => this.lugares = lugares
    );
  }



  eliminar(lugar: Lugar): void {
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el lugar ${lugar.nombre}?`,
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
        this.lugarService.delete(lugar.id).subscribe(
          response => {
            this.lugares = this.lugares.filter(lug => lug !== lugar)
            Swal.fire(
              'Lugar Eliminado!',
              `Lugar ${lugar.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }
}
