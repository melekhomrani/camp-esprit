import { TestBed } from '@angular/core/testing';

import { CampingapiService } from './campingapi.service';

describe('CampingapiService', () => {
  let service: CampingapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampingapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
