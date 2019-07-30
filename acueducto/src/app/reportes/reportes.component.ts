import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { FacturaService } from '../factura/factura.service';
import { Factura } from '../factura/Factura';
import { LugarService } from '../lugar/lugar.service';
import { Lugar } from '../lugar/lugar';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  public dataFacturas: number[];
  public facturas: Factura[];
  public lugares: Lugar[];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[]; //= ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[];

  // = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  // ];

  constructor(public facturaService: FacturaService, public veredaService: LugarService) { }

  ngOnInit() {
    this.facturaService.getfacturas().subscribe(
     facturas => this.facturas = facturas
    )

    this.veredaService.getListaVeredas().subscribe(
      lugares=>{ this.lugares  = lugares
        console.log(this.lugares)
      }
    )
for (let index = 0; index < this.lugares.length; index++) {
  const elementV = this.lugares[index];
  this.barChartLabels.push(elementV.nombre);
  let consumo = 0;
  for (let index = 0; index < this.facturas.length; index++) {
    const element = this.facturas[index];
    if(element.predio.vereda === elementV){
      for (let index = 0; index < element.detallesFactura.length; index++) {
        const elementD = element.detallesFactura[index];
        consumo += elementD.cantidad;
      }
    }
    this.dataFacturas.push(consumo);
    
    //this.barChartData.push(consumo);
    consumo = 0;
  }
  this.barChartData = [
    { data: this.dataFacturas, label: 'Series A' },
  ];
}

    

    
  }

  // filter(data: string) {
  //   if (data) {
  //     this.dataFacturas = this.facturas.filter((factura: Factura) => {
  //       return factura.nombre.toLowerCase().indexOf(data.toLowerCase()) > -1;
  //     });
  //   } else {
  //     this.suscriptoresFiltrados = this.suscriptores;
  //   }
  // }


  // filter(data: string) {
  //   if (data) {
  //     this.dataFacturas = this.facturas.filter((factura: Factura) => {
  //       return factura.nombre.toLowerCase().indexOf(data.toLowerCase()) > -1;
  //     });
  //   } else {
  //     this.suscriptoresFiltrados = this.suscriptores;
  //   }
  // }

   // events
   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }

}
