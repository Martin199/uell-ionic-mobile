import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StagesPreferenceComponent } from './stages-preference.component';

describe('StagesPreferenceComponent', () => {
  let component: StagesPreferenceComponent;
  let fixture: ComponentFixture<StagesPreferenceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StagesPreferenceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StagesPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
