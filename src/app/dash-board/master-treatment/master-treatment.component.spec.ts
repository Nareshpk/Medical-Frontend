import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTreatmentComponent } from './master-treatment.component';

describe('MasterTreatmentComponent', () => {
  let component: MasterTreatmentComponent;
  let fixture: ComponentFixture<MasterTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterTreatmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
