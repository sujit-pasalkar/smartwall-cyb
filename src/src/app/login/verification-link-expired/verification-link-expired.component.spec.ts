import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationLinkExpiredComponent } from './verification-link-expired.component';

describe('VerificationLinkExpiredComponent', () => {
  let component: VerificationLinkExpiredComponent;
  let fixture: ComponentFixture<VerificationLinkExpiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationLinkExpiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationLinkExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
