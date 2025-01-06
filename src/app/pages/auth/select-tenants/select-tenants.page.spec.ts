import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectTenantsPage } from './select-tenants.page';

describe('SelectTenantsPage', () => {
  let component: SelectTenantsPage;
  let fixture: ComponentFixture<SelectTenantsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTenantsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
