import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectNoteComponent } from './prospect-note.component';

describe('ProspectNoteComponent', () => {
  let component: ProspectNoteComponent;
  let fixture: ComponentFixture<ProspectNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProspectNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
