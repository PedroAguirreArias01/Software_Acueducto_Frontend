import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Suscriptor } from './Suscriptor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-suscriptores',
  templateUrl: './suscriptores.component.html',
  styleUrls: ['./suscriptores.component.css']
})
export class SuscriptoresComponent implements OnInit {

  private lista: Suscriptor[];
  public cedula: string;

  constructor(public http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.get_Suscriptores();
    //this.getSuscrptores();
  }

  public headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  get_Suscriptores() {
    this.http.get<Suscriptor[]>('http://localhost:8080/suscriptores/').subscribe((res) => {
      console.log(res);
      this.lista = res;
    });
  }

  eliminar(suscriptor: Suscriptor) {
    let url = 'http://localhost:8080/suscriptores/' + suscriptor.cedula+"/";

        
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false,
        })
        
        swalWithBootstrapButtons.fire({
          title: 'Esta Seguro?',
          text: "No podrás revertir esto.!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, Eliminarlo!',
          cancelButtonText: 'No, Cancelar!',
          reverseButtons: true
        }).then((result) => {
          
          if (result.value) {
            this.http.delete<Suscriptor>(url,this.headers).subscribe((res) => {
            
            
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Suscriptor Eliminado.',
              'success'
            )
            });
            this.get_Suscriptores();
            this.router.navigate(['/suscriptores']);
          } else if (
            // Read more about handling dismissals
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your imaginary file is safe :)',
              'error'
            )
          }
        })
  };

  editar(suscriptor: Suscriptor){
    console.log(suscriptor.nombre);
    let url = 'http://localhost:8080/suscriptores/';
    this.http.put<Suscriptor>(url,
       suscriptor)
      .subscribe(dataIncoming => {   // data is already a JSON object
    console.log(dataIncoming);
      })
  };

}
