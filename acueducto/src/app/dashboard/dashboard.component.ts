import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../factura/factura.service';
import { Factura } from '../factura/Factura';
import { DashboardInfoService } from './dashboard-info.service';
import { DashboardInfo } from './DashboardInfo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  public pageActual: number = 1;
  public facturasPendPago: Array<Factura> = [];
  public listfacturas: Array<Factura> = [];
  public dashboardInfo: DashboardInfo;


  constructor(private facturaService: FacturaService, private dashboardInfoService: DashboardInfoService) {
    this.dashboardInfo = new DashboardInfo();
   }

  ngOnInit() {

    this.dashboardInfoService.getSummaryInfo().subscribe(
      dashboardInfo => this.dashboardInfo = dashboardInfo
    );

    this.facturaService.getfacturas().subscribe(
      listfacturas => {
        this.listfacturas = listfacturas
        this.facturasPendPago = this.listfacturas.filter((factura: Factura) => {
          return factura.estadoFactura.indexOf('PP') > -1 ||
            factura.estadoFactura.indexOf('VE') > -1;
        });
      }
    );
  }

}
