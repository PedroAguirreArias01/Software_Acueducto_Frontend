import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Predio } from '../Predio';
import { ModalService } from 'src/app/suscriptores/detalle-suscriptor/modal.service';

@Component({
  selector: 'detalle-predio',
  templateUrl: './detalle-predio.component.html',
  styleUrls: ['./detalle-predio.component.css']
})
export class DetallePredioComponent implements OnInit {

  @Input() predio:Predio;
  //datos para el mapa
  public zoom: number = 18;
  public lat: number = 5.851154;
  public lng: number = -73.577350;
  
  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalService.cerrarModal();
  }

}
