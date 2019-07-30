import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Factura } from '../Factura';
import { Suscriptor } from 'src/app/suscriptores/Suscriptor';
import * as jspdf from 'jspdf';
// import html2canvas from 'html2canvas';
import * as html2canvas from 'html2canvas';
declare var $: any;
@Component({
  selector: 'app-factura-detalles',
  templateUrl: './factura-detalles.component.html',
  styleUrls: ['./factura-detalles.component.css']
})
export class FacturaDetallesComponent implements OnInit {

  public suscriptor: Suscriptor = new Suscriptor();
  public factura: Factura = new Factura();

  constructor(public dialogRef: MatDialogRef<FacturaDetallesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Factura) {
    this.factura = data;
  }

  ngOnInit() {
  }


  close() {
    this.dialogRef.close();
  }

  @ViewChild('content', { static: false }) content: ElementRef;

  // downloadPdf(id: number) {
  //   const doc = new jspdf();
  //   const content = this.content.nativeElement;
  //   html2canvas(content).then(canvas => {
  //     const imgData = canvas.toDataURL('image/png');
  //     // Few necessary setting options
  //     const imgWidth = 208;
  //     const pageHeight = 295;
  //     const imgHeight = canvas.height * imgWidth / canvas.width;
  //     const doc = new jspdf('p', 'mm');
  //     let heightLeft = imgHeight;
  //     let position = 0;

  //     doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight;
  //     while (heightLeft >= 0) {
  //       position = heightLeft - imgHeight;
  //       doc.addPage();
  //       doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;
  //     }
  //     console.log('numero factura'+id)
  //     // Generated PDF
  //     doc.save('factura'+id + '.pdf');
  //   });
  // }


  downloadPdf(): void {
   
//     let printContents, popupWin;
//     printContents = document.getElementById('content').innerHTML;
//     popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=auto');
//     popupWin.document.open();
//     popupWin.document.write(`
//   <html>
//     <head>
//       <title>Print tab</title>
//       <style>
//       //........Customized style.......
//       </style>
//     </head>
// <body onload="window.print();window.close()">${printContents}</body>
//   </html>`
//     );
//     popupWin.document.close();
  }


}
