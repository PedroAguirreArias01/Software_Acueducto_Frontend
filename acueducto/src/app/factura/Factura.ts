import { DetalleFactura } from './DetallesFactura';
import { Suscriptor } from '../suscriptores/Suscriptor';

export class Factura{
    public id:number;
    public fechaEmision: Date;
    public periodoFacturado: Date;
    public fechaMaximoPago: Date;
    public fechaPago: Date;
    public detallesFactura: DetalleFactura[];
    public suscriptor: Suscriptor;
}