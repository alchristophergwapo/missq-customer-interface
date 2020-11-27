import { TestBed } from '@angular/core/testing';

import { MsqServiceService } from './msq-service.service';

describe('MsqServiceService', () => {
  let service: MsqServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsqServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
