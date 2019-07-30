import { Component, OnInit } from '@angular/core';
import { Predio } from './Predio';
import { PredioService } from './predio.service';
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';
import { LugarService } from '../lugar/lugar.service'
import { Lugar } from '../lugar/lugar';
import { SuscriptorService } from '../suscriptores/suscriptor.service';
import { Suscriptor } from '../suscriptores/Suscriptor';
import { GoogleMapsAPIWrapper, InfoWindowManager } from '@agm/core';
import { } from '@agm/core/services/google-maps-types';
import { FormControl } from '@angular/forms';
import { MatOption, MatAutocompleteSelectedEvent } from '@angular/material';


//mapss
import { } from 'googlemaps';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';


@Component({
  selector: 'app-predios-form',
  templateUrl: './predios-form.component.html',
  styleUrls: ['./predios-form.component.css']
})
export class PrediosFormComponent implements OnInit {

  public predio: Predio = new Predio();
  public editar: boolean;
  public veredas: Lugar[];
  public suscriptores: Suscriptor[];
  //datos para el mapa
  public zoom: number = 18;
  public lat: number = 5.851154;
  public lng: number = -73.577350;
  public origin: any;
  public destination: any;
  public markerOptions = {
    destination: { infoWindow: `<h3>Hello word</h3>` }
  };
  public renderOptions = { suppressMarkers: true };

  public suscriptoresFiltrados: Observable<Suscriptor>;
  public suscriptor: Suscriptor = new Suscriptor();
  myItem = new FormControl();

  constructor(private predioService: PredioService, private lugarService: LugarService, private suscriptorService: SuscriptorService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getListaVeredas();
    this.getSuscriptores();
    this.cargarLugar();
    this.suscriptoresFiltrados = this.myItem.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.nombre),
        flatMap(value => value ? this._filterSuscriptor(value) : [])
      );
  }

  onSubmit() {
    this.crear();
  }


  public crear(): void {
    this.predioService.create(this.predio).
      subscribe(predio => {
        this.router.navigate(['/predios'])
        Swal.fire({
          title: 'Nuevo Predio!',
          text: `Predio ${this.predio.nombre} creado con exito`,
          type: 'success',
          confirmButtonText: 'Aceptar'
        })
      }
      )
  }

  cargarLugar(): void {
    this.editar = false;
    this.activatedRoute.params.subscribe(params => {
      let numeroMatricula = params['numeroMatricula'];
      if (numeroMatricula) {
        this.editar = true;
        this.predioService.getPredio(numeroMatricula).subscribe(
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

  getListaVeredas() {
    this.lugarService.getListaVeredas().subscribe(
      veredas => this.veredas = veredas
    );
  }

  getSuscriptores() {
    this.suscriptorService.getSuscriptores().subscribe(
      suscriptores => this.suscriptores = suscriptores
    );
  }

  //o1 -> del *ngFor
  //o2 -> asignado al predio
  compararVereda(o1: Lugar, o2: Lugar) {
    return (o1 == null || o2 == null) ? false : (o1.id === o2.id);
  }

  //o1 -> del *ngFor
  //o2 -> asignado al predio
  compararSuscriptor(o1: Suscriptor, o2: Suscriptor) {
    return (o1 == null || o2 == null) ? false : (o1.cedula === o2.cedula);
  }

  placeMarker($event) {
    this.predio.latitud = $event.coords.lat;
    this.predio.longitud = $event.coords.lng;
  }

  //--------------------metodos de filtrado para suscriptor----------------------
  seleccionarSuscriptor(event: MatAutocompleteSelectedEvent): void {
    let suscriptor = event.option.value as Suscriptor;
    this.predio.suscriptor = suscriptor;
    //this.myItem.setValue('');
    // event.option.focus();
    // event.option.deselect();
  }


  mostrarSuscriptor(suscriptor?: Suscriptor): string | undefined {
    return suscriptor ? suscriptor.nombre+'  '+suscriptor.apellido: undefined;
  }

  private _filterSuscriptor(value: string): Observable<Suscriptor[]> {
    return this.predioService.searchSuscriptor(value);
  }


  //---------------------------mapas------------------------------------
  // initMap() {
  //   var mapCanvas = document.getElementById("map");
  //   var myCenter = new google.maps.LatLng(4.0000000, -72.0000000);
  //   var mapOptions = {
  //     center: myCenter,
  //     zoom: 15,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };
  //   this.googleMap = new google.maps.Map(mapCanvas, mapOptions);
  //   google.maps.event.addListener(this.googleMap, 'click', (event) => {
  //     this.placeMarker(event);
  //   });
  // }

  // placeMarker(event) {
  //   if (event) {
  //     this.predio.latitud = event.latLng.lat();
  //     this.predio.longitud = event.latLng.lng();
  //     this.marker.setOptions({
  //       position: { lat: this.predio.latitud, lng: this.predio.longitud },
  //       map: this.googleMap
  //     })
  //   }
  // }

  // addBicycleLayer() {
  //   var bikeLayer = new google.maps.BicyclingLayer();
  //   bikeLayer.setMap(this.googleMap);
  // }

  // setMapType(mapTypeId: string) {
  //   this.googleMap.setMapTypeId(mapTypeId)
  // }

  // setCenter(e: any) {
  //   e.preventDefault();
  //   this.googleMap.setCenter(new google.maps.LatLng(this.latitude, this.longitute));
  // }

}
