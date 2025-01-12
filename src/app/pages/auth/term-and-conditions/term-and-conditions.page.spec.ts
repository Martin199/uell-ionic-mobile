import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TermAndConditionsPage } from './term-and-conditions.page';

describe('TermAndConditionsPage', () => {
  let component: TermAndConditionsPage;
  let fixture: ComponentFixture<TermAndConditionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TermAndConditionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
