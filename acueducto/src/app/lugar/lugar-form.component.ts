import { Component, OnInit } from '@angular/core';
import { Lugar } from './lugar';
import { LugarService } from './lugar.service';
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lugar-form',
  templateUrl: './lugar-form.component.html',
  styleUrls: ['./lugar-form.component.css']
})
export class LugarFormComponent implements OnInit {

  public lugar: Lugar = new Lugar();
  public editar: boolean;
  private listaMunicipios: Lugar[];
  private tipoLugar:String;

  constructor(private lugarService: LugarService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarLugar();
    this.getListaMunicipios();
  }

  onSubmit() {
    this.crear();
  }

  public crear(): void {
    this.lugarService.create(this.lugar).
      subscribe(suscriptor => {
        this.router.navigate(['/lugar'])
        Swal.fire({
          title: 'Nuevo Lugar!',
          text: `Lugar ${suscriptor.nombre} creado con exito`,
          type: 'success',
          confirmButtonText: 'Cool'
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
        this.lugarService.getLugar(id).subscribe(
          (lugar) => {
          this.lugar = lugar
          }
        )
      }
    })
  }

  update(): void {
    this.lugarService.update(this.lugar).subscribe(suscriptor => {
      this.router.navigate(['/lugar'])
      Swal.fire({
        title: 'Actualizar Lugar!',
        text: `Lugar ${suscriptor.nombre} actualizado con exito`,
        type: 'success',
        confirmButtonText: 'Aceptar'
      })
    })
  }

  getListaMunicipios(){
    this.lugarService.getListaMunicipios().subscribe(
      listaMunicipios => this.listaMunicipios = listaMunicipios
    );
  }

  onChange(event:any){
  
    console.log('entra: '+event as string);
  }

}
