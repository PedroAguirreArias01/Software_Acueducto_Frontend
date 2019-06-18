import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router,ActivatedRoute } from "@angular/router";
import { Tarifa } from './Tarifa';
import { TarifaService } from './tarifa.service';
@Component({
  selector: 'app-tarifa-form',
  templateUrl: './tarifa-form.component.html',
  styleUrls: ['./tarifa-form.component.css']
})
export class TarifaFormComponent implements OnInit {

  
  public tarifa: Tarifa = new Tarifa();
  public editar:boolean;


  constructor(private tarifaService: TarifaService, private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarTarifa();
  }
 
  onSubmit() {
    this.crear();
  }

  public crear(): void {
    this.tarifaService.create(this.tarifa).
      subscribe(tarifa => {
        this.router.navigate(['/tarifas'])
        Swal.fire({
          title: 'Nueva Tarifa!',
          text: `Tarifa ${tarifa.descripcion} creada con exito`,
          type: 'success',
          confirmButtonText: 'Aceptar'
        })
      }
      )
  }

  cargarTarifa(): void{
    this.editar = false;
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.editar = true;
        this.tarifaService.getTarifa(id).subscribe(
          (tarifa) =>{ this.tarifa = tarifa
          }
        )
      }
    })
  }

  update(): void {
    this.tarifaService.update(this.tarifa).subscribe( tarifa => {
      this.router.navigate(['/tarifas'])
      Swal.fire({
        title: 'Actualizar Tarifa!',
        text: `Tarifa ${tarifa.descripcion} actualizada con exito`,
        type: 'success',
        confirmButtonText: 'Aceptar'
      })
    })
  }

}
