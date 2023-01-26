import { TestBed } from '@angular/core/testing';

import { ViewLisService } from './viewLis.service';

describe('ViewLisService', () => {
  let service: ViewLisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewLisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
