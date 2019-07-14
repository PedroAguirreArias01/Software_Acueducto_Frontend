import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './Usuario';

const clientID = 'acueducto';
const password = '12345';
//Codifica las credenciales en base64 
const credentials = btoa(clientID + ':' + password);

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private urlEndPoint: string = 'http://localhost:8080/oauth/token';
  private _empleado: Usuario;
  private _token: string;

  //Basic DEBE llevar un espacio
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + credentials
  })

  constructor(private http: HttpClient) { }

  public get empleado(): Usuario {
    if (this._empleado != null) {
      return this._empleado;
    } else if (this._empleado == null && sessionStorage.getItem('usuario') != null) {
      this._empleado = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._empleado;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(empleado: Usuario): Observable<any> {

    let params = new URLSearchParams();

    //Envía el tipo de autenticación y las credenciales
    params.set('grant_type', 'password');
    params.set('username', empleado.usuario);
    params.set('password', empleado.contrasena);

    return this.http.post(this.urlEndPoint, params.toString(), { headers: this.httpHeaders });
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', this._token);
  }
  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._empleado = new Usuario();
    this._empleado.nombre = payload.nombre;
    this._empleado.apellido = payload.apellido;
    //Atributos del payload se llaman así por oauth
    this._empleado.usuario = payload.user_name;
    this._empleado.foto = payload.foto;
    this._empleado.roles = payload.authorities;
    //Session storage solo deja guardar strings, por eso se utiliza el método de la clase JSON
    sessionStorage.setItem('usuario', JSON.stringify(this._empleado));

  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    //Obtiene el token con el método getter
    let payload = this.obtenerDatosToken(this.token);

    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._empleado = null;
    //Borra todas las variables del session storage
    sessionStorage.clear();
  }

  hasRole(role: string):boolean{
    //Verifica en la instancia del usuario loggeado (si la hay) si tiene el rol especificado
    return this.empleado.roles.includes(role);
  }

}
