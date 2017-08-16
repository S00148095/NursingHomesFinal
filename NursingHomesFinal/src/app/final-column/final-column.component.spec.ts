import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalColumnComponent } from './final-column.component';

describe('FinalColumnComponent', () => {
  let component: FinalColumnComponent;
  let fixture: ComponentFixture<FinalColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
