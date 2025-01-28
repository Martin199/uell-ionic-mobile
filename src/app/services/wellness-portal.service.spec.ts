import { TestBed } from '@angular/core/testing';

import { WellnessPortalService } from './wellness-portal.service';

describe('WellnessPortalService', () => {
  let service: WellnessPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WellnessPortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
