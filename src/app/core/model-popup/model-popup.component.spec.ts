import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPopupComponent } from './model-popup.component';
import { MatDialog } from '@angular/material/dialog';

describe('ModelPopupComponent', () => {
  let component: ModelPopupComponent;
  let fixture: ComponentFixture<ModelPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelPopupComponent ],
      providers: [
        // workaround: why I can't inject MatDialogRef in the unit test?
        {provide: MatDialog, useValue: {}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
