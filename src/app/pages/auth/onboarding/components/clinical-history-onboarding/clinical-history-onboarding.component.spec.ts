import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClinicalHistoryOnboardingComponent } from './clinical-history-onboarding.component';

describe('ClinicalHistoryOnboardingComponent', () => {
  let component: ClinicalHistoryOnboardingComponent;
  let fixture: ComponentFixture<ClinicalHistoryOnboardingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalHistoryOnboardingComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClinicalHistoryOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
