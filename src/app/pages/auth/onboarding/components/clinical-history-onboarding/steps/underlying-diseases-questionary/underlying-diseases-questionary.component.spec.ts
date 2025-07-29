import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnderlyingDiseasesQuestionaryComponent } from './underlying-diseases-questionary.component';

describe('UnderlyingDiseasesQuestionaryComponent', () => {
  let component: UnderlyingDiseasesQuestionaryComponent;
  let fixture: ComponentFixture<UnderlyingDiseasesQuestionaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderlyingDiseasesQuestionaryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnderlyingDiseasesQuestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
