import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IspsResultComponent } from './isps-result.component';

describe('IspsResultComponent', () => {
    let component: IspsResultComponent;
    let fixture: ComponentFixture<IspsResultComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [IspsResultComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(IspsResultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
