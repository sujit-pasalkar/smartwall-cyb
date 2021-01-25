import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallSocialMediaFeedsComponent } from './wall-social-media-feeds.component';

describe('WallSocialMediaFeedsComponent', () => {
  let component: WallSocialMediaFeedsComponent;
  let fixture: ComponentFixture<WallSocialMediaFeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallSocialMediaFeedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WallSocialMediaFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
