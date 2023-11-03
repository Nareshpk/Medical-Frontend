import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOpPatientComponent } from './list-op-patient.component';

describe('ListOpPatientComponent', () => {
  let component: ListOpPatientComponent;
  let fixture: ComponentFixture<ListOpPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOpPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOpPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
