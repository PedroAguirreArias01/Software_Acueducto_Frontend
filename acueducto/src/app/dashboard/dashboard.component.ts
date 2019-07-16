import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../factura/factura.service';
import { Factura } from '../factura/Factura';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public pageActual: number = 1;
  public facturasPendPago: Array<Factura>=[];
  public listfacturas: Array<Factura>=[];
  

  constructor(public facturaService: FacturaService) { }
 
  ngOnInit() {
    this.facturaService.getfacturas().subscribe(
      listfacturas => {
       this.listfacturas= listfacturas
       this.facturasPendPago = this.listfacturas.filter((factura: Factura) => {
         return factura.estadoFactura.indexOf('PP') > -1 ||
         factura.estadoFactura.indexOf('VE') > -1;
       });

      }
    );

  }

}
