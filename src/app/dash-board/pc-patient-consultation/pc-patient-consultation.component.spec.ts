import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcPatientConsultationComponent } from './pc-patient-consultation.component';

describe('PcPatientConsultationComponent', () => {
  let component: PcPatientConsultationComponent;
  let fixture: ComponentFixture<PcPatientConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcPatientConsultationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcPatientConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
