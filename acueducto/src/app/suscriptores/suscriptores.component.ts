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

}
