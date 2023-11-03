import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustemerAddComponent } from './custemer-add.component';

describe('CustemerAddComponent', () => {
  let component: CustemerAddComponent;
  let fixture: ComponentFixture<CustemerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustemerAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustemerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
