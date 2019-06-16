import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { Suscriptor } from './Suscriptor';
import Swal from 'sweetalert2';
import { SuscriptorService } from './suscriptor.service';

@Component({
  selector: 'app-suscriptores',
  templateUrl: './suscriptores.component.html',
  styleUrls: ['./suscriptores.component.css']
})

export class SuscriptoresComponent implements OnInit {

  private suscriptores: Suscriptor[];
  private suscriptor: Suscriptor;
  constructor(private suscriptorService: SuscriptorService, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.suscriptorService.getSuscriptores().subscribe(
      suscriptores => this.suscriptores = suscriptores
    );
  }

  eliminar(suscriptor: Suscriptor): void {
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${suscriptor.nombre} ${suscriptor.apellido}?`,
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

        this.suscriptorService.delete(suscriptor.cedula).subscribe(
          response => {
            this.suscriptores = this.suscriptores.filter(cli => cli !== suscriptor)
            Swal.fire(
              'Cliente Eliminado!',
              `Cliente ${suscriptor.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }


  // public headers = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // }

  // eliminar(suscriptor: Suscriptor) {
  //       const swalWithBootstrapButtons = Swal.mixin({
  //         customClass: {
  //           confirmButton: 'btn btn-success',
  //           cancelButton: 'btn btn-danger'
  //         },
  //         buttonsStyling: false,
  //       })
        
  //       swalWithBootstrapButtons.fire({
  //         title: 'Esta Seguro?',
  //         text: "No podrás revertir esto.!",
  //         type: 'warning',
  //         showCancelButton: true,
  //         confirmButtonText: 'Si, Eliminarlo!',
  //         cancelButtonText: 'No, Cancelar!',
  //         reverseButtons: true
  //       }).then((result) => {
  //         if (result.value) {
  //           this.suscriptorService.delete(suscriptor.cedula).subscribe(
  //             suscriptor => {
  //               swalWithBootstrapButtons.fire(
  //                 'Eliminado!',
  //                 'Suscriptor Eliminado.',
  //                 'success'
  //               )
  //               this.router.navigate(['/suscriptores']);
  //             }
  //           )
  //         } else if (
  //           // Read more about handling dismissals
  //           result.dismiss === Swal.DismissReason.cancel
  //         ) {
  //           swalWithBootstrapButtons.fire(
  //             'Cancelled',
  //             'Your imaginary file is safe :)',
  //             'error'
  //           )
  //         }
  //       })
  // };

  // editar(suscriptor: Suscriptor){
  //   console.log(suscriptor.nombre);
  //   let url = 'http://localhost:8080/suscriptores/';
  //   this.http.put<Suscriptor>(url,
  //      suscriptor)
  //     .subscribe(dataIncoming => {   // data is already a JSON object
  //   console.log(dataIncoming);
  //     })
  // };

}
