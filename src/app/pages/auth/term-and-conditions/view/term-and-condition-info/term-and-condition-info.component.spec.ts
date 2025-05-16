import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TermAndConditionInfoComponent } from './term-and-condition-info.component';

describe('TermAndConditionInfoComponent', () => {
    let component: TermAndConditionInfoComponent;
    let fixture: ComponentFixture<TermAndConditionInfoComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TermAndConditionInfoComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(TermAndConditionInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
