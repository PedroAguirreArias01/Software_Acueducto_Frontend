import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { Tarifa } from '../Tarifa';

@Component({
  selector: 'app-historial-tarifa-modal',
  templateUrl: './historial-tarifa-modal.component.html',
  styleUrls: ['./historial-tarifa-modal.component.css']
})
export class HistorialTarifaModalComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<HistorialTarifaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tarifa) { }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close();
  }

}
