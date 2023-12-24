import { TestBed } from '@angular/core/testing';

import { CrudprojectService } from './crudproject.service';

describe('CrudprojectService', () => {
  let service: CrudprojectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudprojectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
