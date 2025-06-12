import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MedicalInformationSecondComponent } from './medical-information-second.component';

describe('MedicalInformationSecondComponent', () => {
    let component: MedicalInformationSecondComponent;
    let fixture: ComponentFixture<MedicalInformationSecondComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MedicalInformationSecondComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(MedicalInformationSecondComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
