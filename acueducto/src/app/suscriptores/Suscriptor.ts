import { Deserialize } from '../predios/deserialize';

export class Suscriptor implements Deserialize {
    public cedula: string;
    public nombre: string;
    public apellido: string;
    public estado: string;
    public estadoCuenta: string;
    public fechaNacimiento: Date;
    public genero: string;
    public numeroTelefono: string;
    public correoElectronico: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}