import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmSideRouteComponent } from './crm-side-route.component';

describe('CrmSideRouteComponent', () => {
  let component: CrmSideRouteComponent;
  let fixture: ComponentFixture<CrmSideRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmSideRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmSideRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
