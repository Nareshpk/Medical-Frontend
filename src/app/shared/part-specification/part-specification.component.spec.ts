import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartSpecificationComponent } from './part-specification.component';

describe('PartSpecificationComponent', () => {
  let component: PartSpecificationComponent;
  let fixture: ComponentFixture<PartSpecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartSpecificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
