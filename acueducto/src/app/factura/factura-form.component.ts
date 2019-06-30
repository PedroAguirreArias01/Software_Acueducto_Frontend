import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';
import { Factura } from './Factura';
import { FacturaService } from './factura.service';
import { PredioService } from '../predios/predio.service';
import { Predio } from '../predios/Predio';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, flatMap } from 'rxjs/operators';
import { MatOption, MatAutocompleteSelectedEvent } from '@angular/material';
import { MatDialog } from '@angular/material';
import { FacturaModalComponent } from './factura-modal/factura-modal.component'
import { Suscriptor } from '../suscriptores/Suscriptor';
import { Tarifa } from '../tarifa/Tarifa';
import { TarifaService } from '../tarifa/tarifa.service';
import { DetalleFactura } from './DetallesFactura';

@Component({
  selector: 'app-factura-form',
  templateUrl: './factura-form.component.html',
})
export class FacturaFormComponent implements OnInit {

  public factura: Factura = new Factura();
  public editar: boolean;
  public suscriptor: Suscriptor = new Suscriptor();
  public detalleFactura: DetalleFactura;
  public predio: Predio = new Predio();

  filteredOptions: Observable<Predio[]>;
  myControl = new FormControl();

  tarifasFiltradas: Observable<Tarifa[]>;
  myItem = new FormControl();

  constructor(private facturaService: FacturaService, private tarifaService: TarifaService, private predioService: PredioService,
    private router: Router, private activatedRoute: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    if (this.editar) {
      this.cargarFactura();
    }
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.nombre),
        flatMap(value => value ? this._filter(value) : [])
      );

    this.tarifasFiltradas = this.myItem.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.nombre),
        flatMap(value => value ? this._filterTarifa(value) : [])
      );
  }


  onSubmit() {
    this.crear();
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

  open() {
    const dialogRef = this.dialog.open(
      FacturaModalComponent, {
        width: '50%',
        height: '60%',
        data: { factura: FacturaFormComponent }
      }
    );
  }

  seleccionarPredio(event: MatAutocompleteSelectedEvent): void {
    let predio = event.option.value as Predio;
    this.predio = predio;
    this.factura.predio = predio;
    this.suscriptor = predio.suscriptor;
    console.log('factura seleccionado: ' + JSON.stringify(this.factura))

  }

  mostrarPredio(predio?: Predio): string | undefined {
    return predio ? predio.nombre : undefined;
  }

  private _filter(value: string): Observable<Predio[]> {
    return this.predioService.searchPredios(value);
  }

  private _filterTarifa(value: string): Observable<Tarifa[]> {
    return this.tarifaService.searchTarifa(value);
  }

  mostrarTarifa(tarifa?: Tarifa): string | undefined {
    return tarifa ? tarifa.descripcion : undefined;
  }

  seleccionarTarifa(event: MatAutocompleteSelectedEvent): void {
    let tarifa = event.option.value as Tarifa;
    if (this.existeItem(tarifa.id)) {
      this.incrementaCantidad(tarifa.id);
    } else {
      let nuevoDetalle = new DetalleFactura();
      nuevoDetalle.tarifa = tarifa;
      this.factura.detallesFactura.push(nuevoDetalle);
    }
    this.myItem.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;
    if(cantidad == 0){
      return this.eliminarItem(id);
    }
    this.factura.detallesFactura = this.factura.detallesFactura.map((item: DetalleFactura) => {
      if (id === item.tarifa.id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(id: number): boolean {
    let existe = false;
    this.factura.detallesFactura.forEach((item: DetalleFactura) => {
      if (id === item.tarifa.id) {
        existe = true;
      }
    })
    return existe;
  }

  incrementaCantidad(id: number): void {
    this.factura.detallesFactura = this.factura.detallesFactura.map((item: DetalleFactura) => {
      if (id === item.tarifa.id) {
        ++item.cantidad;
      }
      return item;
    });
  }

  eliminarItem(id: number): void{
    this.factura.detallesFactura = this.factura.detallesFactura.filter((item: DetalleFactura) => id !== item.tarifa.id);
  }

  public crear(): void {
    console.log(JSON.stringify(this.factura));
    this.facturaService.create(this.factura).
      subscribe(factura => {
        this.router.navigate(['/Facturas'])
        Swal.fire({
          title: 'Nueva Factura!',
          text: `Factura ${factura.id} creada con exito`,
          type: 'success',
          confirmButtonText: 'Aceptar'
        })
      }
      )
  }
}
