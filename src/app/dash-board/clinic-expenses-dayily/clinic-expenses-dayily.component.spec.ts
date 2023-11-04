import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicExpensesDayilyComponent } from './clinic-expenses-dayily.component';

describe('ClinicExpensesDayilyComponent', () => {
  let component: ClinicExpensesDayilyComponent;
  let fixture: ComponentFixture<ClinicExpensesDayilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicExpensesDayilyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicExpensesDayilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
