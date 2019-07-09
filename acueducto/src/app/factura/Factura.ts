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
  public granTotal: number;

  calcularGranTotal(): number {
    this.granTotal = 0;
    this.detallesFactura.forEach((item: DetalleFactura) => {
      this.granTotal += item.calcularValor();
    });
    return this.granTotal;
  }
}