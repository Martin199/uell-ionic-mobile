import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserAddressInfoComponent } from './user-address-info.component';

describe('UserAddressInfoComponent', () => {
    let component: UserAddressInfoComponent;
    let fixture: ComponentFixture<UserAddressInfoComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [UserAddressInfoComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(UserAddressInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
