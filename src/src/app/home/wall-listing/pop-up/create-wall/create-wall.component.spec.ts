import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWallComponent } from './create-wall.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('CreateWallComponent', () => {
  let component: CreateWallComponent;
  let fixture: ComponentFixture<CreateWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWallComponent ],
      providers: [
        // workaround: why I can't inject MatDialogRef in the unit test?
        {provide: MatDialog, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
