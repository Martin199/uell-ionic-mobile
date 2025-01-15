import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WellnessPortalPage } from './wellness-portal.page';

describe('WellnessPortalPage', () => {
  let component: WellnessPortalPage;
  let fixture: ComponentFixture<WellnessPortalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WellnessPortalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
