import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePanelsComponent } from './home-panels.component';

describe('HomePanelsComponent', () => {
  let component: HomePanelsComponent;
  let fixture: ComponentFixture<HomePanelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePanelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
