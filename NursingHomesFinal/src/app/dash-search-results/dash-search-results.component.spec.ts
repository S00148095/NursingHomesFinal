import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashSearchResultsComponent } from './dash-search-results.component';

describe('DashSearchResultsComponent', () => {
  let component: DashSearchResultsComponent;
  let fixture: ComponentFixture<DashSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashSearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
