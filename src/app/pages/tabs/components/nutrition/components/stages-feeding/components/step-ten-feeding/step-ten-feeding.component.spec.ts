import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepTenFeedingComponent } from './step-ten-feeding.component';

describe('StepTenFeedingComponent', () => {
  let component: StepTenFeedingComponent;
  let fixture: ComponentFixture<StepTenFeedingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StepTenFeedingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepTenFeedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
