import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepFiveFeedingComponent } from './step-five-feeding.component';

describe('StepFiveFeedingComponent', () => {
  let component: StepFiveFeedingComponent;
  let fixture: ComponentFixture<StepFiveFeedingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StepFiveFeedingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepFiveFeedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
