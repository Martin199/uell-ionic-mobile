import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UellCoinComponent } from './uell-coin.component';

describe('UellCoinComponent', () => {
    let component: UellCoinComponent;
    let fixture: ComponentFixture<UellCoinComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [UellCoinComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(UellCoinComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
