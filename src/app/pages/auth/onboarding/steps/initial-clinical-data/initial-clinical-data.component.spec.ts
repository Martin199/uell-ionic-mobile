import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InitialClinicalDataComponent } from './initial-clinical-data.component';

describe('InitialClinicalDataComponent', () => {
    let component: InitialClinicalDataComponent;
    let fixture: ComponentFixture<InitialClinicalDataComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [InitialClinicalDataComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(InitialClinicalDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
