import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Suscriptor } from '../Suscriptor';
import { SuscriptorService } from '../suscriptor.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './modal.service';
import { Predio } from 'src/app/predios/Predio';

@Component({
  selector: 'detalle-suscriptor',
  templateUrl: './detalle-suscriptor.component.html',
  styleUrls: ['./detalle-suscriptor.component.css']
})
export class DetalleSuscriptorComponent implements OnInit, OnChanges{

 
  //Inyecta el suscriptor
  @Input() suscriptor:Suscriptor;

  public predios:Predio[] = [];
  private titulo:String;

  constructor(private suscriptorService: SuscriptorService, private activatedRoute: ActivatedRoute, private modalService: ModalService) {
    this.titulo = "Detalle Suscriptor";
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cargarPrediosSuscriptor(this.suscriptor.cedula);
  }

  ngOnInit() {
    this.cargarSuscriptor();
    this.cargarPrediosSuscriptor(this.suscriptor.cedula);
    console.log(this.predios);
  }

  private cargarPrediosSuscriptor(cedula: string){
    this.suscriptorService.getPrediosBySuscriptor(cedula).subscribe(
      predios => {
        console.log(predios)
        return this.predios = predios;
      }
    );
  }

  cargarSuscriptor(){
    // this.activatedRoute.paramMap.subscribe(
    //   params=> {
    //     let cedula:string = params.get('cedula');
    //     if(cedula){
    //       this.suscriptorService.getSuscriptor(cedula).subscribe(
    //         suscriptor => this.suscriptor = suscriptor
    //       )
    //     }
    //   }
    // );
  }

  cerrarModal(){
    this.modalService.cerrarModal();
  }
}
