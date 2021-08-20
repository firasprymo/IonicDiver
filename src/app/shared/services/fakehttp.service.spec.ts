import { TestBed } from '@angular/core/testing';

import { FakehttpService } from './fakehttp.service';

describe('FakehttpService', () => {
  let service: FakehttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakehttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
