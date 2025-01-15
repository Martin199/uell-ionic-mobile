import { TestBed } from '@angular/core/testing';

import { ISPSService } from './isps.service';

describe('ISPSService', () => {
  let service: ISPSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ISPSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
