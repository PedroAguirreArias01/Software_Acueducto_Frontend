import { Component, OnInit } from '@angular/core';
import { Factura } from './Factura';
import { FacturaService } from './factura.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from '@angular/material';
import { FacturaDetallesComponent } from './factura-detalles/factura-detalles.component';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  public pageActual: number = 1;
  public facturas: Array<Factura> = [];

  constructor(public facturaService: FacturaService
    ,public dialog: MatDialog) { }

  ngOnInit() {
    this.facturaService.getfacturas().subscribe(
      facturas => {
        this.facturas = facturas
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
        this.facturaService.delete(factura.id).subscribe(
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

  open(factura:Factura) {
    console.log('sisisisis'+JSON.stringify(factura))
    const dialogRef = this.dialog.open(
      FacturaDetallesComponent,{
        width :'60%',
        height:'80%',
        data: {factura: factura}
      }
    );
  }

}
