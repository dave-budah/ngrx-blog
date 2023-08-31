import { TestBed } from '@angular/core/testing';

import { UpdatearticleService } from './updatearticle.service';

describe('UpdatearticleService', () => {
  let service: UpdatearticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatearticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
