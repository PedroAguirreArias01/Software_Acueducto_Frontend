export class Suscriptor {
    constructor(
        public cedula: number,
      public nombre: string,
      public apellido: string,
      public estado: number,
      public estadoCuenta: string,
      public fechaNacimiento: Date,
      public genero: string,
      public numeroTelefono: string,
      public correoElectronico: string
    ) {}
  }