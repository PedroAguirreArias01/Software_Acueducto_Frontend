
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Suscriptor } from '../suscriptores/Suscriptor';

@Component({
  selector: 'app-suscriptores-form',
  templateUrl: './suscriptores-form.component.html',
  styleUrls: ['./suscriptores-form.component.css']
})
export class SuscriptoresFormComponent implements OnInit {

  public suscriptorInfo:string[];
  public suscriptor: Suscriptor;

  constructor(public saveSuscriptores: HttpClient, private router:Router) { }

  ngOnInit() {
    this.suscriptorInfo = [];
  }

  send(cedula,nombre,apellido, estado,estadoCuenta,fechaNacimiento,genero,numeroTelefono, correoElectronico){
    console.log('este es el nombre'+nombre);
    
    //this.suscriptorInfo.push(cedula,nombre,apellido,estado,estadoCuenta,fechaNacimiento,genero,numeroTelefono,correoElectronico);
    this.suscriptor = new Suscriptor(cedula,nombre,apellido,estado,estadoCuenta,fechaNacimiento,genero,numeroTelefono,correoElectronico);
    //console.log(this.suscriptor);
    //this.SaveSuscrptores(this.suscriptor);
  }

  
  public headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  SaveSuscrptores(suscriptor){
    console.log(suscriptor.nombre);
    let url = 'http://localhost:8080/suscriptores';
    this.saveSuscriptores.post(url,
      suscriptor, this.headers)
      .subscribe(dataIncoming => {   // data is already a JSON object
    console.log(dataIncoming);
      })
  };
  
}