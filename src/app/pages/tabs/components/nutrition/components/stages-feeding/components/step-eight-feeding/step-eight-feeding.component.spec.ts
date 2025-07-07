import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepEightFeedingComponent } from './step-eight-feeding.component';

describe('StepEightFeedingComponent', () => {
  let component: StepEightFeedingComponent;
  let fixture: ComponentFixture<StepEightFeedingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StepEightFeedingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepEightFeedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
