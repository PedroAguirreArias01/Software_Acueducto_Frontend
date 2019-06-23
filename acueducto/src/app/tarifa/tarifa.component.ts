import { Component, OnInit,Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from "@angular/router";
import { Tarifa } from './Tarifa';
import { TarifaService } from './tarifa.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material';
import { HistorialTarifaModalComponent } from './historial-tarifa-modal/historial-tarifa-modal.component';

@Component({
  selector: 'app-tarifa',
  templateUrl: './tarifa.component.html',
  styleUrls: ['./tarifa.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class TarifaComponent implements OnInit {

  name:string = "holi";
  
  private tarifas: Tarifa[];
  private tarifa: Tarifa;
  public pageActual: number=1;
  constructor(private tarifaService: TarifaService, private router:Router, 
    private activatedRoute: ActivatedRoute, config: NgbModalConfig, private modalService: NgbModal, public dialog: MatDialog) {
      config.backdrop = 'static';
      config.keyboard = false;
     }

  ngOnInit() {
    this.tarifaService.get().subscribe(
      tarifas => {this.tarifas = tarifas
        for (let index = 0; index < tarifas.length; index++) {
          const element = tarifas[index];
          console.log('ESTARIFA: '+element.fechaInicio)
          
        }
      }
    );
  }

  eliminar(tarifa: Tarifa): void {
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la Tarifa ${tarifa.id} ${tarifa.descripcion}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.tarifaService.delete(tarifa.id).subscribe(
          response => {
            this.tarifas = this.tarifas.filter(tari => tari !== tarifa)
            Swal.fire(
              'Tarifa Eliminada!',
              `Tarifa ${tarifa.descripcion} eliminada con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }

  
  open(tarifa:Tarifa) {
    console.log(tarifa);
    const dialogRef = this.dialog.open(
      HistorialTarifaModalComponent,{
        width :'50%',
        height:'60%',
        data: {tarifa: tarifa}
      }
    );
  }

}

