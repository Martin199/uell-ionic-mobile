import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalMentalStatusComponent } from './modal-mental-status.component';

describe('ModalMentalStatusComponent', () => {
    let component: ModalMentalStatusComponent;
    let fixture: ComponentFixture<ModalMentalStatusComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ModalMentalStatusComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ModalMentalStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
