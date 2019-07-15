import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Factura } from './Factura';
import { FacturaService } from './factura.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from '@angular/material';
import { FacturaDetallesComponent } from './factura-detalles/factura-detalles.component';
import * as jspdf from 'jspdf';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { FormControl } from '@angular/forms';
import { AuthService } from '../usuario/auth.service';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class FacturaComponent implements OnInit {

  public pageActual: number = 1;
  public facturas: Array<Factura> = [];
  public facturasFiltradas: Array<Factura> = [];
  public filtroFecha: Date = new Date();
  public estadoFactura: string;
  public factura: Factura = new Factura();

  constructor(public facturaService: FacturaService
    , public dialog: MatDialog, public authService: AuthService, private router: Router) { }


  date = new FormControl(moment());
  serializedDate = new FormControl((new Date()).toISOString());

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.filtroFecha = new Date(this.date.value)
    this.filerFacturasDate();
  }


  ngOnInit() {
    this.facturaService.getfacturas().subscribe(
      facturas => {
        this.facturas = facturas
        this.facturasFiltradas = this.facturas;
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

  open(factura: Factura) {
    const dialogRef = this.dialog.open(
      FacturaDetallesComponent, {
        width: '60%',
        height: '80%',
        data: { factura: factura }
      }
    );
  }

  @ViewChild('content', { static: false }) content: ElementRef;

  downloadPDF() {
    let doc = new jspdf();
    let specialElementHandlers = {
      '#editor': function (Element, rederer) {
        return true;

      }
    }

    let conetnt = this.content.nativeElement;
    doc.fromHTML(conetnt.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    }, function () {
      doc.save('result.pdf');
    });
  }

  filter(data: string) {
    if (data) {
      this.facturasFiltradas = this.facturas.filter((factura: Factura) => {
        return factura.predio.nombre.toLowerCase().indexOf(data.toLowerCase()) > -1;
      });
    } else {
      this.facturasFiltradas = this.facturas;
    }
  }

  filerFacturasDate() {
    if (this.filtroFecha) {
      var month = this.filtroFecha.getUTCMonth() + 1; //months from 1-12
      var year = this.filtroFecha.getUTCFullYear();
      this.facturasFiltradas = this.facturas.filter((factura: Factura) => {
        let dateFac = new Date(factura.periodoFacturado);
        var monthFac = dateFac.getUTCMonth() + 1; //months from 1-12
        var yearFac = dateFac.getUTCFullYear();
        if ((month === monthFac) && (year === yearFac)) {
          return factura;
        }
      });
    } else {
      this.facturasFiltradas = this.facturas;
    }

  }


  filterFacturasEstado(data: string) {
    if (data && (data != 'todo')) {
      this.facturasFiltradas = this.facturas.filter((factura: Factura) => {
        return factura.estadoFactura.toLowerCase().indexOf(data.toLowerCase()) > -1;
      });
    } else {
      this.facturasFiltradas = this.facturas;
    }
  }


  registrarPago(factura) {
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea generar el pago a la factura ${factura.id}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Generar pago!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.facturaService.update(this.factura).subscribe(factura => {
          this.router.navigate(['/facturas'])
          Swal.fire({
            title: 'Actualizar pago factura!',
            text: `Pago de la factura ${this.factura.id} realizado con exito`,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        })

      }
    })
  }
}
