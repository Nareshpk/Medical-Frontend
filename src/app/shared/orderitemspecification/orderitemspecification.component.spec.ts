import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderitemspecificationComponent } from './orderitemspecification.component';

describe('OrderitemspecificationComponent', () => {
  let component: OrderitemspecificationComponent;
  let fixture: ComponentFixture<OrderitemspecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderitemspecificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderitemspecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
