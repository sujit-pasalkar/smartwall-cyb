import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWallComponent } from './delete-wall.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('DeleteWallComponent', () => {
  let component: DeleteWallComponent;
  let fixture: ComponentFixture<DeleteWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteWallComponent ],
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
    fixture = TestBed.createComponent(DeleteWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
