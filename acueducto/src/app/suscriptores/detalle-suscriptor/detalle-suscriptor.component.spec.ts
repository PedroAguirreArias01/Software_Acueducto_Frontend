import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSuscriptorComponent } from './detalle-suscriptor.component';

describe('DetalleSuscriptorComponent', () => {
  let component: DetalleSuscriptorComponent;
  let fixture: ComponentFixture<DetalleSuscriptorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleSuscriptorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSuscriptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
