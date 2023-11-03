import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcPatientDetailsComponent } from './pc-patient-details.component';

describe('PcPatientDetailsComponent', () => {
  let component: PcPatientDetailsComponent;
  let fixture: ComponentFixture<PcPatientDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcPatientDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcPatientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
