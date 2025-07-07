import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepOnePreferenceComponent } from './step-one-preference.component';

describe('StepOnePreferenceComponent', () => {
  let component: StepOnePreferenceComponent;
  let fixture: ComponentFixture<StepOnePreferenceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StepOnePreferenceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepOnePreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
