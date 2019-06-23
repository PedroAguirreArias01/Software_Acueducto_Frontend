import { Component, OnInit } from '@angular/core';
import { Predio } from './Predio';
import { PredioService } from './predio.service';
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';
import {LugarService} from '../lugar/lugar.service'
import { Lugar } from '../lugar/lugar';
import {SuscriptorService } from '../suscriptores/suscriptor.service';
import { Suscriptor } from '../suscriptores/Suscriptor';

@Component({
  selector: 'app-predios-form',
  templateUrl: './predios-form.component.html',
  styleUrls: ['./predios-form.component.css']
})
export class PrediosFormComponent implements OnInit {

  public predio: Predio = new Predio();
  public editar: boolean;
  public lugares: Lugar[];
  public suscriptores: Suscriptor[];
 
  constructor(private predioService: PredioService,  private lugarService: LugarService, private suscriptorService: SuscriptorService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getListaLugares();
    this.cargarLugar();
    this.getSuscriptores();
  }

  onSubmit() {
    this.crear();
  }

  public crear(): void {
    console.log(JSON.stringify(this.predio));
    this.predioService.create(this.predio).
      subscribe(predio => {
        
        this.router.navigate(['/predios'])
        Swal.fire({
          title: 'Nuevo Predio!',
          text: `Predio ${predio.numeroMatricula} creado con exito`,
          type: 'success',
          confirmButtonText: 'Aceptar'
        })
      }
      )
  }

  cargarLugar(): void {
    this.editar = false;
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.editar = true;
        this.predioService.getLugar(id).subscribe(
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

  getListaLugares(){
    this.lugarService.getListaVeredas().subscribe(
      lugares => this.lugares = lugares
    );
  }

  getSuscriptores(){
    this.suscriptorService.getSuscriptores().subscribe(
      suscriptores => this.suscriptores = suscriptores
    );
  }
}
