import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOpPatientComponent } from './history-op-patient.component';

describe('HistoryOpPatientComponent', () => {
  let component: HistoryOpPatientComponent;
  let fixture: ComponentFixture<HistoryOpPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryOpPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryOpPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
