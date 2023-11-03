import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicExpensesComponent } from './clinic-expenses.component';

describe('ClinicExpensesComponent', () => {
  let component: ClinicExpensesComponent;
  let fixture: ComponentFixture<ClinicExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
