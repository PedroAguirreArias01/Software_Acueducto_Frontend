import { Tarifa } from '../tarifa/Tarifa';

export class DetalleFactura{
    public id:number;
    public tarifa: Tarifa;
    public consumoActual: number;
    public valor: number;
}