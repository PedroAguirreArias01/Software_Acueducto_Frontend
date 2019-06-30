import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { Tarifa } from 'src/app/tarifa/Tarifa';
import { TarifaService } from 'src/app/tarifa/tarifa.service';
import { DetalleFactura } from '../DetallesFactura';
import { Factura } from '../Factura';

@Component({
  selector: 'app-factura-modal',
  templateUrl: './factura-modal.component.html',
  styleUrls: ['./factura-modal.component.css']
})
export class FacturaModalComponent implements OnInit {

  public tarifas: Tarifa[];
  public tarifa: Tarifa = new Tarifa();
  public detalleFactura: DetalleFactura = new DetalleFactura();

  constructor( public dialogRef: MatDialogRef<FacturaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public factura: Factura, public tarifaService: TarifaService) { }

  ngOnInit() {
    this.getTarifas();
  }

  close(){
    this.dialogRef.close();
  }

  getTarifas(){
    this.tarifaService.get().subscribe(
      tarifas => this.tarifas = tarifas
    )
  }

  getTarifa(tarifa: Tarifa){
    if(tarifa !== null){
      this.tarifa = tarifa;
    }
    console.log('esta es la tarifa: '+JSON.stringify(this.tarifa))
    return tarifa ? tarifa.descripcion: undefined;
  }

  loadTarifa(){
    this.tarifa;
  }

  addTarifaFactura(detalleFactura: DetalleFactura, tarifa: Tarifa): DetalleFactura {
    detalleFactura.tarifa = tarifa;
    this.detalleFactura = detalleFactura;
    if(detalleFactura !== null){
      //this.factura.detallesFactura.push(detalleFactura);
      console.log('este es el detelle: '+JSON.stringify(detalleFactura));
      this.dialogRef.close();
      return detalleFactura;
    }
  }
  
}
