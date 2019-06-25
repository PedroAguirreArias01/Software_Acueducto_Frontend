import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';
import { Factura } from './Factura';
import { FacturaService } from './factura.service';
import { PredioService } from '../predios/predio.service';
import { Predio } from '../predios/Predio';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatOption } from '@angular/material';
import { MatDialog } from '@angular/material';
import { FacturaModalComponent } from './factura-modal/factura-modal.component'
import { Suscriptor } from '../suscriptores/Suscriptor';

@Component({
  selector: 'app-factura-form',
  templateUrl: './factura-form.component.html',
})
export class FacturaFormComponent implements OnInit {

  //public searchTerm: FormControl = new FormControl();
  private predios: Predio[];
  //private prediosFiltrados: Predio[];
  //private show: boolean;

  public factura: Factura = new Factura();
  public editar: boolean;
  public facturas: Factura[];
  public predio: Predio = new Predio();
  public suscriptor: Suscriptor = new Suscriptor();

  constructor(private facturaService: FacturaService, private predioService: PredioService, 
    private router: Router, private activatedRoute: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    if (this.editar) {
      this.cargarFactura();
    }
    this.cargarPredios();
  }


  onSubmit() {
    this.crear();
  }

  // private filter(pred: any): Predio[] {

  //   return this.predios.filter((item: any) => {
  //     console.log("m");
  //     //If the user selects an option, the value becomes a Human object,
  //     //therefore we need to reset the val for the filter because an
  //     //object cannot be used in this toLowerCase filter
  //     if (typeof pred === 'object') { pred = "" };
  //     const TempString = item.nombre;
  //     return TempString.toLowerCase().includes(pred.toLowerCase());
  //   });
  // }

  // autocompleteDisplay(item: any): string {
  //   if (item == undefined) { return }
  //   return item.nombre;
  // }

  // OnPredioSelected(option: MatOption) {
  //   console.log(option.value);
  // }

  public crear(): void {
    console.log(JSON.stringify(this.factura));
    this.facturaService.create(this.factura).
      subscribe(factura => {

        this.router.navigate(['/Facturas'])
        Swal.fire({
          title: 'Nueva Factura!',
          text: `Factura ${factura} creado con exito`,
          type: 'success',
          confirmButtonText: 'Aceptar'
        })
      }
      )
  }

  cargarFactura(): void {
    this.editar = false;
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.editar = true;
        this.facturaService.getFactura(id).subscribe(
          (factura) => {
            this.factura = factura
          }
        )
      }
    })
  }

  update(): void {
    this.facturaService.update(this.factura).subscribe(factura => {
      this.router.navigate(['/facturas'])
      Swal.fire({
        title: 'Actualizar Factura!',
        text: `Factura ${factura.id} actualizado con exito`,
        type: 'success',
        confirmButtonText: 'Aceptar'
      })
    })
  }

  cargarPredios() {
    this.predioService.get().subscribe(
      predios => {this.predios = predios
          console.log('Predio cargado:'+JSON.stringify(this.predios[0]));
      }
    )
  }

  open() {
    const dialogRef = this.dialog.open(
      FacturaModalComponent,{
        width :'50%',
        height:'60%',
        //data: {tarifa: tarifa}
      }
    );
  }

}
