import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteSideRouteComponent } from './website-side-route.component';

describe('WebsiteSideRouteComponent', () => {
  let component: WebsiteSideRouteComponent;
  let fixture: ComponentFixture<WebsiteSideRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteSideRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteSideRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
