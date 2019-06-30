import { Lugar } from '../lugar/lugar';
import { Suscriptor } from '../suscriptores/Suscriptor';
import { Factura } from '../factura/Factura';

export class Predio {
    public numeroMatricula: string;
    public vereda: Lugar;
    public nombre: string;
    public estrato: string;
    public latitud: number;
    public longitud: string;
    public suscriptor: Suscriptor;
    public facturas: Factura[];

    public isUpToDate(): boolean {
        return false;
    }
}