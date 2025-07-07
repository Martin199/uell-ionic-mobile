import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepSevenFeedingComponent } from './step-seven-feeding.component';

describe('StepSevenFeedingComponent', () => {
  let component: StepSevenFeedingComponent;
  let fixture: ComponentFixture<StepSevenFeedingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StepSevenFeedingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepSevenFeedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
