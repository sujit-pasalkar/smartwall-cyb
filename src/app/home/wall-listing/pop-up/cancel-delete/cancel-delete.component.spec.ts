import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelDeleteComponent } from './cancel-delete.component';

describe('CancelDeleteComponent', () => {
  let component: CancelDeleteComponent;
  let fixture: ComponentFixture<CancelDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
