import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriealrequestItemComponent } from './materiealrequest-item.component';

describe('MateriealrequestItemComponent', () => {
  let component: MateriealrequestItemComponent;
  let fixture: ComponentFixture<MateriealrequestItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriealrequestItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriealrequestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
