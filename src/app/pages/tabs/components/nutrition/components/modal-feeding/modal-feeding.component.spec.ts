import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalFeedingComponent } from './modal-feeding.component';

describe('ModalFeedingComponent', () => {
  let component: ModalFeedingComponent;
  let fixture: ComponentFixture<ModalFeedingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalFeedingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalFeedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
