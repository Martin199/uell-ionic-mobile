import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepFourFeedingComponent } from './step-four-feeding.component';

describe('StepFourFeedingComponent', () => {
  let component: StepFourFeedingComponent;
  let fixture: ComponentFixture<StepFourFeedingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StepFourFeedingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepFourFeedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
