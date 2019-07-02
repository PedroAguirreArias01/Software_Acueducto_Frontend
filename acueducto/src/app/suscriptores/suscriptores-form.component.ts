
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import { Suscriptor } from '../suscriptores/Suscriptor';
import Swal from 'sweetalert2';
import { SuscriptorService } from './suscriptor.service';

@Component({
  selector: 'app-suscriptores-form',
  templateUrl: './suscriptores-form.component.html',
  styleUrls: ['./suscriptores-form.component.css']
})

export class SuscriptoresFormComponent implements OnInit {

  private formTitle: string;
  private submitButtonText: string;

  public suscriptor: Suscriptor = new Suscriptor();
  public editar:boolean;

  private minYears: number;
  private minDate: Date;
  private maxDate:Date;


  constructor(private suscriptorService: SuscriptorService, private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.minYears= 18;
    this.minDate = new Date(1900,0,1);
    this.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - this.minYears));
    this.cargarSuscriptor();
  }

  public createSuscriptor(): void {
    this.suscriptorService.create(this.suscriptor).
      subscribe(suscriptor => {
        this.router.navigate(['/suscriptores'])
        Swal.fire({
          title: 'Nuevo Suscriptor!',
          text: `Suscriptor ${suscriptor.nombre} creado con exito`,
          type: 'success',
          confirmButtonText: 'Cool'
        })
      }
      )
  }

  cargarSuscriptor(): void{
    this.editar = false;
    this.activatedRoute.params.subscribe(params => {
      let cedula = params['cedula'];
      if(cedula){
        this.editar = true;
        this.suscriptorService.getSuscriptor(cedula).subscribe(
          (suscriptor) =>{ this.suscriptor = suscriptor
          }
        )
      }
    })
  }

  update(): void {
    this.suscriptorService.update(this.suscriptor).subscribe( suscriptor => {
      this.router.navigate(['/suscriptores'])
      Swal.fire({
        title: 'Actualizar Suscriptor!',
        text: `Suscriptor ${suscriptor.nombre} actualizado con exito`,
        type: 'success',
        confirmButtonText: 'Aceptar'
      })
    })
  }

}
