import { TestBed } from '@angular/core/testing';

import { MentalStatusService } from './mental-status.service';

describe('MentalStatusService', () => {
  let service: MentalStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentalStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
