import { Lugar } from '../lugar/lugar';
import { Rol } from './roles';

export class Usuario {
    public cedula: string;
    public nombre: string;
    public apellido: string;
    public fechaNacimiento: Date;
    public tipoEmpleado: string;
    public usuario: string;
    public contrasena: string;
    public genero: string;
    public direccionResidencia: string;
    public lugarResidencia: Lugar;
    public rol: Rol;
    public foto: string;
}