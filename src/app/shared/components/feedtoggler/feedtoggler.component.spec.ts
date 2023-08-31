import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedtogglerComponent } from './feedtoggler.component';

describe('FeedtogglerComponent', () => {
  let component: FeedtogglerComponent;
  let fixture: ComponentFixture<FeedtogglerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeedtogglerComponent]
    });
    fixture = TestBed.createComponent(FeedtogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
