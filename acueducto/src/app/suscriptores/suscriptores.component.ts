import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Suscriptor } from './Suscriptor';

@Component({
  selector: 'app-suscriptores',
  templateUrl: './suscriptores.component.html',
  styleUrls: ['./suscriptores.component.css']
})
export class SuscriptoresComponent implements OnInit {

  private lista:Suscriptor[];
  public cedula: string;

  constructor(public loadSuscriptores: HttpClient, private router:Router) { }

  ngOnInit() {
    this.get_Suscriptores();
    //this.getSuscrptores();
  }

  public headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  get_Suscriptores(){
    this.loadSuscriptores.get<Suscriptor[]>('http://localhost:8080/suscriptores/').subscribe((res)=>{
        console.log(res);
        this.lista = res;
    });
}

eliminar(suscriptor: Suscriptor){
    console.log(suscriptor.cedula);
    let url = 'http://localhost:8080/suscriptores/'+suscriptor.cedula;
    this.loadSuscriptores.delete<Suscriptor>(url)
    
      .subscribe(dataIncoming => {   // data is already a JSON object
        this.router.navigate(['/app-suscriptores']);
    console.log(dataIncoming);
    //this.get_Suscriptores();
    
      })
  };

  // editar(suscriptor){
  //   console.log(suscriptor.nombre);
  //   let url = 'http://localhost:8080/suscriptores/';
  //   this.loadSuscriptores.delete<Suscriptor>(url,
  //     suscriptor.cedula)
  //     .subscribe(dataIncoming => {   // data is already a JSON object
  //   console.log(dataIncoming);
  //     })
  // };

}
