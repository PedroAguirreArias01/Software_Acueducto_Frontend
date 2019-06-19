
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

  public suscriptorInfo: string[];
  public suscriptor: Suscriptor = new Suscriptor();
  public editar:boolean;

  constructor(private suscriptorService: SuscriptorService, private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarSuscriptor();
  }

 

  onSubmit() {
    this.crear();
  }

  public crear(): void {
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
      console.log('este es el Suscripto: '+suscriptor.cedula);
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