import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalRateMealPlanComponent } from './modal-rate-meal-plan.component';

describe('ModalRateMealPlanComponent', () => {
  let component: ModalRateMealPlanComponent;
  let fixture: ComponentFixture<ModalRateMealPlanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalRateMealPlanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalRateMealPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
