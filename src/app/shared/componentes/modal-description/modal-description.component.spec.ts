import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDescriptionComponent } from './modal-description.component';

describe('ModalDescriptionComponent', () => {
  let component: ModalDescriptionComponent;
  let fixture: ComponentFixture<ModalDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
