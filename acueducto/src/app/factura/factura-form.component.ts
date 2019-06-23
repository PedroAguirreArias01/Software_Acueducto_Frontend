import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';
import { Factura } from './Factura';
import { FacturaService } from './factura.service';

@Component({
  selector: 'app-factura-form',
  templateUrl: './factura-form.component.html',
  styleUrls: ['./factura-form.component.css']
})
export class FacturaFormComponent implements OnInit {

  public factura: Factura = new Factura();
  public editar: boolean;
  public facturas: Factura[];
 
  constructor(private facturaService: FacturaService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarFactura();
  }

  onSubmit() {
    this.crear();
  }

  public crear(): void {
    console.log(JSON.stringify(this.factura));
    this.facturaService.create(this.factura).
      subscribe(factura => {
        
        this.router.navigate(['/Facturas'])
        Swal.fire({
          title: 'Nueva Factura!',
          text: `Factura ${factura} creado con exito`,
          type: 'success',
          confirmButtonText: 'Aceptar'
        })
      }
      )
  }

  cargarFactura(): void {
    this.editar = false;
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.editar = true;
        this.facturaService.getFactura(id).subscribe(
          (factura) => {
          this.factura = factura
          }
        )
      }
    })
  }

  update(): void {
    this.facturaService.update(this.factura).subscribe(factura => {
      this.router.navigate(['/facturas'])
      Swal.fire({
        title: 'Actualizar Factura!',
        text: `Factura ${factura.id} actualizado con exito`,
        type: 'success',
        confirmButtonText: 'Aceptar'
      })
    })
  }

}
