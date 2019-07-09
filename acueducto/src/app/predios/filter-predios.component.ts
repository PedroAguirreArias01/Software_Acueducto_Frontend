import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-predios',
  template: `    
  Buscar: <mat-form-field><input type="text" [(ngModel)]="filter" matInput placeholder="Nombre predio o Vereda"/></mat-form-field>
`
})
export class FilterPrediosComponent implements OnInit {

  private _filter: string;
  @Input() get filter() {
    return this._filter;
  }

  set filter(val: string) {
    this._filter = val;
    this.changed.emit(this.filter); //Raise changed event
  }

  @Output() changed: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit() {

  }

}
