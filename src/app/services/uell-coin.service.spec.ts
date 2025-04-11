import { TestBed } from '@angular/core/testing';

import { UellCoinService } from './uell-coin.service';

describe('UellCoinService', () => {
  let service: UellCoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UellCoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
