import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { FacturaService } from '../factura/factura.service';
import { Factura } from '../factura/Factura';
import { LugarService } from '../lugar/lugar.service';
import { Lugar } from '../lugar/lugar';
import { ReporteVereda } from '../lugar/reporteVereda';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  public dataFacturas: number[] = [];
  public facturas: Factura[] = [];
  public lugares: Lugar[] = [];
  public lugar: Lugar = new Lugar();
  

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
  public barChartLabels: Label[] = []; //= ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] ;

  //------------------reporte vereda-----------
  public listReporteVereda: ReporteVereda[] = [];

  public barChartOptionsV: ChartOptions = {
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
  public barChartLabelsV: Label[] = []; 
  public barChartTypeV: ChartType = 'bar';
  public barChartLegendV = true;
  public barChartPluginsV = [pluginDataLabels];
  public barChartDataV: ChartDataSets[] ;


  constructor(public facturaService: FacturaService, public veredaService: LugarService) { }

  ngOnInit() {
    this.facturaService.getfacturas().subscribe(
      facturas => this.facturas = facturas
    )

    this.veredaService.getListaVeredas().subscribe(
      lugares => {
      this.lugares = lugares
      this.showInfo();
      }
    )

    this.veredaService.getReporteVereda().subscribe(
      reporteVereda =>{
         this.listReporteVereda = reporteVereda
         this.infoReporteVereda();
      }
    )
  
  
    }

    infoReporteVereda(){
      let label = [];
      let dataV = [];
      for (let index = 0; index < this.listReporteVereda.length; index++) {
        const element = this.listReporteVereda[index];
        label[index] = element.nombreVereda;
        dataV[index] = element.totalRecaudo;
        console.log('recaudos: '+element)
      }
      this.barChartLabelsV = label;
      this.barChartDataV =  [
        { data: dataV, label: 'Series A', backgroundColor: "yellow" },
      ];
    }


    public showInfo(){
     let label = [];
      for (let index = 0; index < this.lugares.length; index++) {
        this.lugar = this.lugares[index];
        label[index] = this.lugar.nombre;
        //console.log('lugar: '+ this.lugar.nombre);
        label[index] = this.lugar.nombre;
        // this.barChartLabels.push(this.lugar.nombre);
        let consumo = 0;
        for (let i = 0; i < this.facturas.length; i++) {
          const element = this.facturas[i];
          if (element.predio.vereda.nombre === this.lugar.nombre) {
            for (let j = 0; j < element.detallesFactura.length; j++) {
              const elementD = element.detallesFactura[j];
              consumo += elementD.cantidad;
            }
            this.dataFacturas.push(consumo);
            consumo = 0;
          }
        }

        this.barChartLabels = label;//['2006', '2007', '2008'];
        this.barChartData =  [
          { data: [65, 59, 80], label: 'Series A', backgroundColor: "blue" },
        ];
    }

  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
