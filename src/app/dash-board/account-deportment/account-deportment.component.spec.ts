import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDeportmentComponent } from './account-deportment.component';

describe('AccountDeportmentComponent', () => {
  let component: AccountDeportmentComponent;
  let fixture: ComponentFixture<AccountDeportmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDeportmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDeportmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
