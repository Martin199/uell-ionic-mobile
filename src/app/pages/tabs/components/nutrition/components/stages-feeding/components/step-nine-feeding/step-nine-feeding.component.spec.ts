import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepNineFeedingComponent } from './step-nine-feeding.component';

describe('StepNineFeedingComponent', () => {
  let component: StepNineFeedingComponent;
  let fixture: ComponentFixture<StepNineFeedingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StepNineFeedingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepNineFeedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
