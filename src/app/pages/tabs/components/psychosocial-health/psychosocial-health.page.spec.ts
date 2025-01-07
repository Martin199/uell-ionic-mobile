import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PsychosocialHealthPage } from './psychosocial-health.page';

describe('PsychosocialHealthPage', () => {
  let component: PsychosocialHealthPage;
  let fixture: ComponentFixture<PsychosocialHealthPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychosocialHealthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
