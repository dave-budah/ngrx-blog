import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulartagsComponent } from './populartags.component';

describe('PopulartgsComponent', () => {
  let component: PopulartagsComponent;
  let fixture: ComponentFixture<PopulartagsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PopulartagsComponent]
    });
    fixture = TestBed.createComponent(PopulartagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
