import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CardPsicosocialComponent } from './card-psicosocial.component';

describe('CardPsicosocialComponent', () => {
    let component: CardPsicosocialComponent;
    let fixture: ComponentFixture<CardPsicosocialComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CardPsicosocialComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(CardPsicosocialComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
