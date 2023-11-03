import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPcPatientComponent } from './history-pc-patient.component';

describe('HistoryPcPatientComponent', () => {
  let component: HistoryPcPatientComponent;
  let fixture: ComponentFixture<HistoryPcPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryPcPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPcPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
