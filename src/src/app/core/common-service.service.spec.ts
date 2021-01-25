import { TestBed } from '@angular/core/testing';

import { CommonServiceService } from './common-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('CommonServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  it('should be created', () => {
    const service: CommonServiceService = TestBed.get(CommonServiceService);
    expect(service).toBeTruthy();
  });
});
