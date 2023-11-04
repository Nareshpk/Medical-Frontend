import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicExpensesMonthlyComponent } from './clinic-expenses-monthly.component';

describe('ClinicExpensesMonthlyComponent', () => {
  let component: ClinicExpensesMonthlyComponent;
  let fixture: ComponentFixture<ClinicExpensesMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicExpensesMonthlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicExpensesMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
