import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CarouselWellnessPortalComponent } from './carousel-wellness-portal.component';

describe('CarouselWellnessPortalComponent', () => {
    let component: CarouselWellnessPortalComponent;
    let fixture: ComponentFixture<CarouselWellnessPortalComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CarouselWellnessPortalComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(CarouselWellnessPortalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
