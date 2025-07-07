import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepThreePreferenceComponent } from './step-three-preference.component';

describe('StepThreePreferenceComponent', () => {
  let component: StepThreePreferenceComponent;
  let fixture: ComponentFixture<StepThreePreferenceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StepThreePreferenceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepThreePreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
