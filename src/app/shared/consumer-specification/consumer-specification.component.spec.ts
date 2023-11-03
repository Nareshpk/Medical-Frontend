import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerSpecificationComponent } from './consumer-specification.component';

describe('ConsumerSpecificationComponent', () => {
  let component: ConsumerSpecificationComponent;
  let fixture: ComponentFixture<ConsumerSpecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerSpecificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
