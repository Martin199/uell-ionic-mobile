import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormIspsStepFourComponent } from './form-isps-step-four.component';

describe('FormIspsStepFourComponent', () => {
    let component: FormIspsStepFourComponent;
    let fixture: ComponentFixture<FormIspsStepFourComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [FormIspsStepFourComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(FormIspsStepFourComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
