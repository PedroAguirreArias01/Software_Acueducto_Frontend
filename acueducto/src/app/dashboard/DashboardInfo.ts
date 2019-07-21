export class DashboardInfo{

  public usuariosActivos: number;
  public carteraPendiente: number;
  public totalRecaudado: number;
  public suscriptoresActivos: number;

  constructor(){
    this.usuariosActivos = 0;
    this.carteraPendiente = 0;
    this.totalRecaudado = 0;
    this.suscriptoresActivos = 0;
  }
}