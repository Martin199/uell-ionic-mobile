import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalSuggestAddressComponent } from './modal-suggest-address.component';

describe('ModalSuggestAddressComponent', () => {
    let component: ModalSuggestAddressComponent;
    let fixture: ComponentFixture<ModalSuggestAddressComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ModalSuggestAddressComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ModalSuggestAddressComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
