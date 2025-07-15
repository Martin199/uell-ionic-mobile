import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepTwoPreferenceComponent } from './step-two-preference.component';

describe('StepTwoPreferenceComponent', () => {
  let component: StepTwoPreferenceComponent;
  let fixture: ComponentFixture<StepTwoPreferenceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StepTwoPreferenceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepTwoPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
