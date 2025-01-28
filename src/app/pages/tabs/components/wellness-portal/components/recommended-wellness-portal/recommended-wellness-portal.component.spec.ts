import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecommendedWellnessPortalComponent } from './recommended-wellness-portal.component';

describe('RecommendedWellnessPortalComponent', () => {
  let component: RecommendedWellnessPortalComponent;
  let fixture: ComponentFixture<RecommendedWellnessPortalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedWellnessPortalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendedWellnessPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
