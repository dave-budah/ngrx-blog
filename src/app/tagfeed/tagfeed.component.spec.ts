import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagfeedComponent } from './tagfeed.component';

describe('GlobalfeedComponent', () => {
  let component: TagfeedComponent;
  let fixture: ComponentFixture<TagfeedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TagfeedComponent]
    });
    fixture = TestBed.createComponent(TagfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
