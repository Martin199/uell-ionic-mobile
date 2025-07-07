import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepThreeFeedingComponent } from './step-three-feeding.component';

describe('StepThreeFeedingComponent', () => {
  let component: StepThreeFeedingComponent;
  let fixture: ComponentFixture<StepThreeFeedingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StepThreeFeedingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepThreeFeedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
