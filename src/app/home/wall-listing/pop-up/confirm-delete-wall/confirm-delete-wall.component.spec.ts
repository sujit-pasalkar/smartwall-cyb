import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteWallComponent } from './confirm-delete-wall.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ConfirmDeleteWallComponent', () => {
  let component: ConfirmDeleteWallComponent;
  let fixture: ComponentFixture<ConfirmDeleteWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // imports: [MatDialog],
      declarations: [ ConfirmDeleteWallComponent ],
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
    fixture = TestBed.createComponent(ConfirmDeleteWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
