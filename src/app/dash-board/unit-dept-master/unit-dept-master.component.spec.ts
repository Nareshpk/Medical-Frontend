import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitDeptMasterComponent } from './unit-dept-master.component';

describe('UnitDeptMasterComponent', () => {
  let component: UnitDeptMasterComponent;
  let fixture: ComponentFixture<UnitDeptMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitDeptMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitDeptMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
