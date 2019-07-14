import { Component, OnInit } from '@angular/core';
import { AuthService } from './usuario/auth.service';
import { Usuario } from './usuario/Usuario';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'acueducto';
  public usuario: Usuario =  new Usuario();

  constructor(public authService: AuthService){

  }
  ngOnInit(){
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }
}
