import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepFourPreferenceComponent } from './step-four-preference.component';

describe('StepFourPreferenceComponent', () => {
  let component: StepFourPreferenceComponent;
  let fixture: ComponentFixture<StepFourPreferenceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StepFourPreferenceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepFourPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
