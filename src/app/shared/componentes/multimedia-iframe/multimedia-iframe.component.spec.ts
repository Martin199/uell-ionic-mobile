import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MultimediaIframeComponent } from './multimedia-iframe.component';

describe('MultimediaIframeComponent', () => {
  let component: MultimediaIframeComponent;
  let fixture: ComponentFixture<MultimediaIframeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MultimediaIframeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultimediaIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
