import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LugarFormComponent } from './lugar-form.component';

describe('LugarFormComponent', () => {
  let component: LugarFormComponent;
  let fixture: ComponentFixture<LugarFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LugarFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LugarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
