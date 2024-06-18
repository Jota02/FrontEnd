import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserControlPage } from './user-control.page';

describe('UserControlPage', () => {
  let component: UserControlPage;
  let fixture: ComponentFixture<UserControlPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserControlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
