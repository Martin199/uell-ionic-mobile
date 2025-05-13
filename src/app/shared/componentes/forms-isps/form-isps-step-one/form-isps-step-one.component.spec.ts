import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormIspsStepOneComponent } from './form-isps-step-one.component';

describe('FormIspsStepOneComponent', () => {
    let component: FormIspsStepOneComponent;
    let fixture: ComponentFixture<FormIspsStepOneComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [FormIspsStepOneComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(FormIspsStepOneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
