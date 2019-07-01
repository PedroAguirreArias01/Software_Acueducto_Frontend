import { Component, OnInit } from '@angular/core';
import { Factura } from './Factura';
import { FacturaService } from './factura.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  public pageActual: number=1;
  public facturas: Array<Factura> = [];

  constructor( public facturaService: FacturaService) { }

  ngOnInit() {
    this.facturaService.get().subscribe(
      facturas =>{
         this.facturas = facturas
         for (let index = 0; index < this.facturas.length; index++) {
           const element = this.facturas[index];
           console.log(JSON.stringify(element));
         }
    }
    );
  }

  eliminar(factura: Factura): void {
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la factura ${factura.id}?`,
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
        this.facturaService.delete(20).subscribe(
          response => {
            this.facturas = this.facturas.filter(fac => fac !== factura)
            Swal.fire(
              'Factura Eliminada!',
              `Factura ${factura.id} eliminada con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }

}
