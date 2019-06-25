import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { Tarifa } from 'src/app/tarifa/Tarifa';
import { TarifaService } from 'src/app/tarifa/tarifa.service';

@Component({
  selector: 'app-factura-modal',
  templateUrl: './factura-modal.component.html',
  styleUrls: ['./factura-modal.component.css']
})
export class FacturaModalComponent implements OnInit {

  public tarifas: Tarifa[];
  public tarifa: Tarifa = new Tarifa();

  constructor( public dialogRef: MatDialogRef<FacturaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tarifa, public tarifaService: TarifaService) { }

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
}
