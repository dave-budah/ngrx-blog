import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourfeedComponent } from './yourfeed.component';

describe('YourfeedComponent', () => {
  let component: YourfeedComponent;
  let fixture: ComponentFixture<YourfeedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [YourfeedComponent]
    });
    fixture = TestBed.createComponent(YourfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
