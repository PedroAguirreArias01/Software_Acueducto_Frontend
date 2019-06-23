import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrediosFormComponent } from './predios-form.component';

describe('PrediosFormComponent', () => {
  let component: PrediosFormComponent;
  let fixture: ComponentFixture<PrediosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrediosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrediosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
