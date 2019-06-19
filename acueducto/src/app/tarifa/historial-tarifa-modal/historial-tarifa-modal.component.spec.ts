import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialTarifaModalComponent } from './historial-tarifa-modal.component';

describe('HistorialTarifaModalComponent', () => {
  let component: HistorialTarifaModalComponent;
  let fixture: ComponentFixture<HistorialTarifaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialTarifaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialTarifaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
