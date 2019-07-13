import { Lugar } from '../lugar/lugar';

export class Empleado {
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
      public roles: string[] = [];
  }