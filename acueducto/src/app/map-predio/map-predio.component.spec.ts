import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPredioComponent } from './map-predio.component';

describe('MapPredioComponent', () => {
  let component: MapPredioComponent;
  let fixture: ComponentFixture<MapPredioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapPredioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPredioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
