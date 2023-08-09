import { TestBed } from '@angular/core/testing';

import { CepserviceService } from './cepservice.service';

describe('CepserviceService', () => {
  let service: CepserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CepserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
