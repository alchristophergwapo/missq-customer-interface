import { TestBed } from '@angular/core/testing';

import { MsqService } from './msq-service.service';

describe('MsqServiceService', () => {
  let service: MsqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
