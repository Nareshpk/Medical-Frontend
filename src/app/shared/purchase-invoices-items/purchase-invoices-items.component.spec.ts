import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInvoicesItemsComponent } from './purchase-invoices-items.component';

describe('PurchaseInvoicesItemsComponent', () => {
  let component: PurchaseInvoicesItemsComponent;
  let fixture: ComponentFixture<PurchaseInvoicesItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseInvoicesItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseInvoicesItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
