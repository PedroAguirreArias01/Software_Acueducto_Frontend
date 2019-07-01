import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Factura } from '../Factura';

@Component({
  selector: 'app-factura-detalles',
  templateUrl: './factura-detalles.component.html',
  styleUrls: ['./factura-detalles.component.css']
})
export class FacturaDetallesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FacturaDetallesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Factura) { }

  ngOnInit() {
  }


  close(){
    this.dialogRef.close();
  }

}
