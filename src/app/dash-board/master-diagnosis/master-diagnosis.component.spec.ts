import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDiagnosisComponent } from './master-diagnosis.component';

describe('MasterDiagnosisComponent', () => {
  let component: MasterDiagnosisComponent;
  let fixture: ComponentFixture<MasterDiagnosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterDiagnosisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
