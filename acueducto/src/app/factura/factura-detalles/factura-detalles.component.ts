import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Factura } from '../Factura';
import { Suscriptor } from 'src/app/suscriptores/Suscriptor';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-factura-detalles',
  templateUrl: './factura-detalles.component.html',
  styleUrls: ['./factura-detalles.component.css']
})
export class FacturaDetallesComponent implements OnInit {

  public suscriptor: Suscriptor = new Suscriptor();

  constructor(public dialogRef: MatDialogRef<FacturaDetallesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Factura) { }

  ngOnInit() {
  }


  close() {
    this.dialogRef.close();
  }

  @ViewChild('content', { static: false }) content: ElementRef;

  downloadPdf() {
    const doc = new jspdf();
    const content = this.content.nativeElement;
    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const doc = new jspdf('p', 'mm');
      let heightLeft = imgHeight;
      let position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      // Generated PDF
      doc.save('asdfghj' + '.pdf');
    });
  }

}
