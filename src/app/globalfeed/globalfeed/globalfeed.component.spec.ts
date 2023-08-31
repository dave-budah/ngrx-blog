import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalfeedComponent } from './globalfeed.component';

describe('GlobalfeedComponent', () => {
  let component: GlobalfeedComponent;
  let fixture: ComponentFixture<GlobalfeedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GlobalfeedComponent]
    });
    fixture = TestBed.createComponent(GlobalfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
