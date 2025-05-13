import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalMedicalRecordComponent } from './modal-medical-record.component';

describe('ModalMedicalRecordComponent', () => {
    let component: ModalMedicalRecordComponent;
    let fixture: ComponentFixture<ModalMedicalRecordComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ModalMedicalRecordComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ModalMedicalRecordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
