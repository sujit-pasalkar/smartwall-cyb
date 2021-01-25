import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallWidgetsComponent } from './wall-widgets.component';

describe('WallWidgetsComponent', () => {
  let component: WallWidgetsComponent;
  let fixture: ComponentFixture<WallWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallWidgetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WallWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
