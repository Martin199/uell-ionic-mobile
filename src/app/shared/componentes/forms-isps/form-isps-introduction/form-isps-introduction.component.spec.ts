import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormIspsIntroductionComponent } from './form-isps-introduction.component';

describe('FormIspsIntroductionComponent', () => {
    let component: FormIspsIntroductionComponent;
    let fixture: ComponentFixture<FormIspsIntroductionComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [FormIspsIntroductionComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(FormIspsIntroductionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
