import { Tarifa } from '../tarifa/Tarifa';

export class DetalleFactura{
    public id:number;
    public tarifa: Tarifa;
    public cantidad: number =1;
    public valorUnitario:number;
    public valor: number;

    public calcularValor(): number {
        this.valor = this.cantidad*this.valorUnitario;
        return this.valor;
    }

}