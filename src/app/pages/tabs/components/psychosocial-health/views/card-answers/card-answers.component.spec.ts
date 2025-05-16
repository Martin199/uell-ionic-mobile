import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CardAnswersComponent } from './card-answers.component';

describe('CardAnswersComponent', () => {
    let component: CardAnswersComponent;
    let fixture: ComponentFixture<CardAnswersComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CardAnswersComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(CardAnswersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
