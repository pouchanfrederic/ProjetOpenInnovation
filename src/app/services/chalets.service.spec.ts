import { TestBed } from '@angular/core/testing';

import { ChaletsService } from './chalets.service';

describe('ChaletsService', () => {
  let service: ChaletsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChaletsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
