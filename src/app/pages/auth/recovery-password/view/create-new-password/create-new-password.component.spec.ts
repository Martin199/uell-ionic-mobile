import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CreateNewPasswordComponent } from './create-new-password.component';

describe('CreateNewPasswordComponent', () => {
    let component: CreateNewPasswordComponent;
    let fixture: ComponentFixture<CreateNewPasswordComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CreateNewPasswordComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(CreateNewPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
