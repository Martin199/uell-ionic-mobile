import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StarsRateComponent } from './stars-rate.component';

describe('StarsRateComponent', () => {
  let component: StarsRateComponent;
  let fixture: ComponentFixture<StarsRateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StarsRateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StarsRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
