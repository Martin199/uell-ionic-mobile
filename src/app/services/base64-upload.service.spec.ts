import { TestBed } from '@angular/core/testing';

import { Base64UploadService } from './base64-upload.service';

describe('Base64UploadService', () => {
  let service: Base64UploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Base64UploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
