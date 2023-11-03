import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationItemsComponent } from './observation-items.component';

describe('ObservationItemsComponent', () => {
  let component: ObservationItemsComponent;
  let fixture: ComponentFixture<ObservationItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservationItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
