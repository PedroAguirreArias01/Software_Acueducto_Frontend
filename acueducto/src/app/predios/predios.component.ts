import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Predio } from './Predio';

@Component({
  selector: 'app-predios',
  templateUrl: './predios.component.html',
  styleUrls: ['./predios.component.css']
})
export class PrediosComponent implements OnInit {

  private lista: Predio[];
  public id: string;

  constructor(public loadPredios: HttpClient, private router:Router) { }

  ngOnInit() {
    this.get_Predios();
  }

  public headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  get_Predios(){
    this.loadPredios.get<Predio[]>('http://localhost:8080/predios/').subscribe((res)=>{
        console.log(res);
        this.lista = res;
    });

    
  
}

}
