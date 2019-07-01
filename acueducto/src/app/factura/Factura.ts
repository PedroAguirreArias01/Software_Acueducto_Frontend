import { DetalleFactura } from './DetallesFactura';
import { Predio } from '../predios/Predio';

export class Factura {
  public id: number;
  public fechaEmision: Date;
  public periodoFacturado: Date;
  public fechaMaximoPago: Date;
  public fechaPago: Date;
  public estadoFactura: string;
  public detallesFactura: Array<DetalleFactura> = [];
  public predio: Predio;
  public total: number;

  calcularGranTotal(): number {
    this.total = 0;
    this.detallesFactura.forEach((item: DetalleFactura) => {
      this.total += item.calcularValor();
    });
    return this.total;
  }
}