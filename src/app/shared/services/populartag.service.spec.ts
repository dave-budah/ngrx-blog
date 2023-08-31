import { TestBed } from '@angular/core/testing';

import { PopulartagService } from './populartag.service';

describe('PopulartagService', () => {
  let service: PopulartagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopulartagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
