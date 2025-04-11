import { TestBed } from '@angular/core/testing';

import { UellCoinServiceService } from './uell-coin-service.service';

describe('UellCoinServiceService', () => {
  let service: UellCoinServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UellCoinServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
