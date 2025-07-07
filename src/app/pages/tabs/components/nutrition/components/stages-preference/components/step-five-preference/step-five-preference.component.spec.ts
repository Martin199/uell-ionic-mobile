import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepFivePreferenceComponent } from './step-five-preference.component';

describe('StepFivePreferenceComponent', () => {
  let component: StepFivePreferenceComponent;
  let fixture: ComponentFixture<StepFivePreferenceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StepFivePreferenceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepFivePreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
