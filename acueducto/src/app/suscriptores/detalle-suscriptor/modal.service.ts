import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  mostrar: boolean = false;
  constructor() { }

  abrirModal() {
    console.log("sisa");
    this.mostrar = true;
  }

  cerrarModal() {
    this.mostrar = false;
  }
}
