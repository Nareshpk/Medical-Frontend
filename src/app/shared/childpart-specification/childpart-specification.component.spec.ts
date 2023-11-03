import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildpartSpecificationComponent } from './childpart-specification.component';

describe('ChildpartSpecificationComponent', () => {
  let component: ChildpartSpecificationComponent;
  let fixture: ComponentFixture<ChildpartSpecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildpartSpecificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildpartSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
