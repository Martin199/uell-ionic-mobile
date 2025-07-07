import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepSixFeedingComponent } from './step-six-feeding.component';

describe('StepSixFeedingComponent', () => {
  let component: StepSixFeedingComponent;
  let fixture: ComponentFixture<StepSixFeedingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StepSixFeedingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepSixFeedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
