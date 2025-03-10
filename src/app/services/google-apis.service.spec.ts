import { TestBed } from '@angular/core/testing';

import { GoogleApisService } from './google-apis.service';

describe('GoogleApisService', () => {
  let service: GoogleApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
