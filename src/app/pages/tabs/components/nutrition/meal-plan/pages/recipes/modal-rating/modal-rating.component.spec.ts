import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalRatingComponent } from './modal-rating.component';

describe('ModalRatingComponent', () => {
  let component: ModalRatingComponent;
  let fixture: ComponentFixture<ModalRatingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalRatingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
