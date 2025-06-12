import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ContextStatusComponent } from './context-status.component';

describe('ContextStatusComponent', () => {
    let component: ContextStatusComponent;
    let fixture: ComponentFixture<ContextStatusComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ContextStatusComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ContextStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
