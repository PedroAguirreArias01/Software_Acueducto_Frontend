import { Component, OnInit } from '@angular/core';
import { PredioService } from '../predios/predio.service';
import { Predio } from '../predios/Predio';

@Component({
  selector: 'app-map-predio',
  templateUrl: './map-predio.component.html',
  styleUrls: ['./map-predio.component.css']
})
export class MapPredioComponent implements OnInit {


 
    //datos para el mapa
    public zoom: number = 18;
    public lat: number = 5.851154;
    public lng: number = -73.577350;
    private predios: Array<Predio> = [];
  
  constructor(public predioService: PredioService) { }

  ngOnInit() {
    this.predioService.get().subscribe(
      predios => {
      this.predios = predios
      }
    );
  }

}
