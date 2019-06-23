export class Lugar{
    public id: number;
    public nombre: string;
    public tipo: string;
    public ubicado:Lugar;
    public lugares:Lugar[];
}