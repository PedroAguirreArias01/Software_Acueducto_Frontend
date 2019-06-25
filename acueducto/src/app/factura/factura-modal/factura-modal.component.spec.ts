import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaModalComponent } from './factura-modal.component';

describe('FacturaModalComponent', () => {
  let component: FacturaModalComponent;
  let fixture: ComponentFixture<FacturaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
