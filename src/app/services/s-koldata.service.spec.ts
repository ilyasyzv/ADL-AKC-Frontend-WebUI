import { TestBed } from '@angular/core/testing';

import { SKoldataService } from './s-koldata.service';

describe('SKoldataService', () => {
  let service: SKoldataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SKoldataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
