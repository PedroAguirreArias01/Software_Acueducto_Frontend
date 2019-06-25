import { Lugar } from '../lugar/lugar';
import { Suscriptor } from '../suscriptores/Suscriptor';

export class Predio {
    public numeroMatricula: string;
    public lugar: Lugar;
    public nombre: string;
    public estrato: string;
    public latitud: number;
    public longitud: string;
    public suscriptor: Suscriptor;
}