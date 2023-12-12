import { TestBed } from '@angular/core/testing';

import { ProjectsfeedService } from './projectsfeed.service';

describe('ProjectsfeedService', () => {
  let service: ProjectsfeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsfeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
