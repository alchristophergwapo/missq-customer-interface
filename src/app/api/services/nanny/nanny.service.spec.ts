import { TestBed } from '@angular/core/testing';

import { NannyService } from './nanny.service';

describe('NannyService', () => {
  let service: NannyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NannyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
