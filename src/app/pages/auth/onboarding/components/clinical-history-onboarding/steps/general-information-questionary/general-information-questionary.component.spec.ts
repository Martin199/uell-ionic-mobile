import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeneralInformationQuestionaryComponent } from './general-information-questionary.component';

describe('GeneralInformationQuestionaryComponent', () => {
  let component: GeneralInformationQuestionaryComponent;
  let fixture: ComponentFixture<GeneralInformationQuestionaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralInformationQuestionaryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralInformationQuestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
