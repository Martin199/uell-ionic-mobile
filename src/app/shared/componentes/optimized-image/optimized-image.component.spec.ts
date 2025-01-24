import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OptimizedImageComponent } from './optimized-image.component';

describe('OptimizedImageComponent', () => {
  let component: OptimizedImageComponent;
  let fixture: ComponentFixture<OptimizedImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [OptimizedImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OptimizedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
