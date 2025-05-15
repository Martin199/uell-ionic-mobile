import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalMentalStatusDescriptionComponent } from './modal-mental-status-description.component';

describe('ModalMentalStatusDescriptionComponent', () => {
    let component: ModalMentalStatusDescriptionComponent;
    let fixture: ComponentFixture<ModalMentalStatusDescriptionComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ModalMentalStatusDescriptionComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ModalMentalStatusDescriptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
