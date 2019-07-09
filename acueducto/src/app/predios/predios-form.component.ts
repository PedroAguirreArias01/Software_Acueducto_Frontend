import { Component, OnInit } from '@angular/core';
import { Predio } from './Predio';
import { PredioService } from './predio.service';
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';
import { LugarService } from '../lugar/lugar.service'
import { Lugar } from '../lugar/lugar';
import { SuscriptorService } from '../suscriptores/suscriptor.service';
import { Suscriptor } from '../suscriptores/Suscriptor';

@Component({
  selector: 'app-predios-form',
  templateUrl: './predios-form.component.html',
  styleUrls: ['./predios-form.component.css']
})
export class PrediosFormComponent implements OnInit {

  public predio: Predio = new Predio();
  public editar: boolean;
  public veredas: Lugar[];
  public suscriptores: Suscriptor[];

  constructor(private predioService: PredioService, private lugarService: LugarService, private suscriptorService: SuscriptorService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getListaVeredas();
    this.getSuscriptores();
    this.cargarLugar();
  }

  onSubmit() {
    this.crear();
  }

  public crear(): void {
    this.predioService.create(this.predio).
      subscribe(predio => {
        this.router.navigate(['/predios'])
        Swal.fire({
          title: 'Nuevo Predio!',
          text: `Predio ${this.predio.nombre} creado con exito`,
          type: 'success',
          confirmButtonText: 'Aceptar'
        })
      }
      )
  }

  cargarLugar(): void {
    this.editar = false;
    this.activatedRoute.params.subscribe(params => {
      let numeroMatricula = params['numeroMatricula'];
      if (numeroMatricula) {
        this.editar = true;
        this.predioService.getPredio(numeroMatricula).subscribe(
          (predio) => {
            this.predio = predio
          }
        )
      }
    })
  }

  update(): void {
    this.predioService.update(this.predio).subscribe(predio => {
      this.router.navigate(['/predios'])
      Swal.fire({
        title: 'Actualizar Predio!',
        text: `Predio ${predio.numeroMatricula} actualizado con exito`,
        type: 'success',
        confirmButtonText: 'Aceptar'
      })
    })
  }

  getListaVeredas() {
    this.lugarService.getListaVeredas().subscribe(
      veredas => this.veredas = veredas
    );
  }

  getSuscriptores() {
    this.suscriptorService.getSuscriptores().subscribe(
      suscriptores => this.suscriptores = suscriptores
    );
  }

  //o1 -> del *ngFor
  //o2 -> asignado al predio
  compararVereda(o1: Lugar, o2: Lugar) {
    return (o1 == null || o2 == null) ? false : (o1.id === o2.id);
  }

   //o1 -> del *ngFor
  //o2 -> asignado al predio
  compararSuscriptor(o1: Suscriptor, o2: Suscriptor) {
    return (o1 == null || o2 == null) ? false : (o1.cedula === o2.cedula);
  }
}
