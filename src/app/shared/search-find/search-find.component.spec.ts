import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFindComponent } from './search-find.component';

describe('SearchFindComponent', () => {
  let component: SearchFindComponent;
  let fixture: ComponentFixture<SearchFindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFindComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
