import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UellMultimediaComponent } from './uell-multimedia.component';

describe('UellMultimediaComponent', () => {
  let component: UellMultimediaComponent;
  let fixture: ComponentFixture<UellMultimediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UellMultimediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UellMultimediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
