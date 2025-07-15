import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StagesFeedingComponent } from './stages-feeding.component';

describe('StagesFeedingComponent', () => {
  let component: StagesFeedingComponent;
  let fixture: ComponentFixture<StagesFeedingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StagesFeedingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StagesFeedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
