import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarPasswordSecurityComponent } from './bar-password-security.component';

describe('BarPasswordSecurityComponent', () => {
  let component: BarPasswordSecurityComponent;
  let fixture: ComponentFixture<BarPasswordSecurityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BarPasswordSecurityComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarPasswordSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
