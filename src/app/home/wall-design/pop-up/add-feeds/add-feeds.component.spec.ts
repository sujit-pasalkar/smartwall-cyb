import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedsComponent } from './add-feeds.component';

describe('AddFeedsComponent', () => {
  let component: AddFeedsComponent;
  let fixture: ComponentFixture<AddFeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFeedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
