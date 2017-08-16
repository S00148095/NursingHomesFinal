import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashHousingComponent } from './dash-housing.component';

describe('DashHousingComponent', () => {
  let component: DashHousingComponent;
  let fixture: ComponentFixture<DashHousingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashHousingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashHousingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
