import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CardMentalStatusComponent } from './card-mental-status.component';

describe('CardMentalStatusComponent', () => {
    let component: CardMentalStatusComponent;
    let fixture: ComponentFixture<CardMentalStatusComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CardMentalStatusComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(CardMentalStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
