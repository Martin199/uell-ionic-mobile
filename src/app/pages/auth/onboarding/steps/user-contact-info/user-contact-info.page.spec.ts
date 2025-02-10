import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserContactInfoPage } from './user-contact-info.page';

describe('UserContactInfoPage', () => {
  let component: UserContactInfoPage;
  let fixture: ComponentFixture<UserContactInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserContactInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
