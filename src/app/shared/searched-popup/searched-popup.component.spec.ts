import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedPopupComponent } from './searched-popup.component';

describe('SearchedPopupComponent', () => {
  let component: SearchedPopupComponent;
  let fixture: ComponentFixture<SearchedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchedPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
