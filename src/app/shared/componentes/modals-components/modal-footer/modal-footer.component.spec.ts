import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalFooterComponent } from './modal-footer.component';

describe('ModalFooterComponent', () => {
    let component: ModalFooterComponent;
    let fixture: ComponentFixture<ModalFooterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ModalFooterComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ModalFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
