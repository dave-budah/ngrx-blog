import { TestBed } from '@angular/core/testing';

import { CreatearticleService } from './createarticle.service';

describe('CreatearticleService', () => {
  let service: CreatearticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatearticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
