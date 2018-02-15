import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingCardsComponent } from './listing-cards.component';

describe('ListingCardsComponent', () => {
  let component: ListingCardsComponent;
  let fixture: ComponentFixture<ListingCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
