import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserPictureInfoComponent } from './user-picture-info.component';

describe('UserPictureInfoComponent', () => {
    let component: UserPictureInfoComponent;
    let fixture: ComponentFixture<UserPictureInfoComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [UserPictureInfoComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(UserPictureInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
