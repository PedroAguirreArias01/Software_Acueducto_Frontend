import { Lugar } from '../lugar/lugar';
import { Suscriptor } from '../suscriptores/Suscriptor';
import { Factura } from '../factura/Factura';
import { Deserialize } from './deserialize';

export class Predio implements Deserialize {
    public numeroMatricula: string;
    public vereda: Lugar;
    public nombre: string;
    public estrato: string;
    public latitud: number;
    public longitud: string;
    public suscriptor: Suscriptor;
    public facturas: Factura[];
    public estado: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    isUpToDate(): boolean{
        return true;
    }
}