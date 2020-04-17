import { TestBed } from '@angular/core/testing';

import { UnhealthyService } from './unhealthy.service';

describe('UnhealthyService', () => {
  let service: UnhealthyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnhealthyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
