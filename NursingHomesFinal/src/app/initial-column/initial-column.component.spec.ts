import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialColumnComponent } from './initial-column.component';

describe('InitialColumnComponent', () => {
  let component: InitialColumnComponent;
  let fixture: ComponentFixture<InitialColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
