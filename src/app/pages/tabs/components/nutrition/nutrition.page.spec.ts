import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NutritionPage } from './nutrition.page';

describe('NutritionPage', () => {
  let component: NutritionPage;
  let fixture: ComponentFixture<NutritionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
