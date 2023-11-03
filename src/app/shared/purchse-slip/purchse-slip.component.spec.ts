import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchseSlipComponent } from './purchse-slip.component';

describe('PurchseSlipComponent', () => {
  let component: PurchseSlipComponent;
  let fixture: ComponentFixture<PurchseSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchseSlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchseSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
