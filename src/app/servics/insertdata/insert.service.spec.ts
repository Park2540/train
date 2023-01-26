import { TestBed } from '@angular/core/testing';

import { ApiInsertService } from './insert.service'

describe('ApiInsertService', () => {
  let service: ApiInsertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiInsertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});