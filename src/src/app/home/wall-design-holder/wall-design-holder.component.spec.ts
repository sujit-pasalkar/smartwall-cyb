import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallDesignHolderComponent } from './wall-design-holder.component';

describe('WallDesignHolderComponent', () => {
  let component: WallDesignHolderComponent;
  let fixture: ComponentFixture<WallDesignHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallDesignHolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WallDesignHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
