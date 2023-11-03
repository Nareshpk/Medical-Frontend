import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPcPatientComponent } from './list-pc-patient.component';

describe('ListPcPatientComponent', () => {
  let component: ListPcPatientComponent;
  let fixture: ComponentFixture<ListPcPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPcPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPcPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
