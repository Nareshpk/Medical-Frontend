import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetunStockPopupComponent } from './retun-stock-popup.component';

describe('RetunStockPopupComponent', () => {
  let component: RetunStockPopupComponent;
  let fixture: ComponentFixture<RetunStockPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetunStockPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetunStockPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
