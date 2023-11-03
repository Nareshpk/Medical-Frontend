import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeConsultationComponent } from './home-consultation.component';

describe('HomeConsultationComponent', () => {
  let component: HomeConsultationComponent;
  let fixture: ComponentFixture<HomeConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeConsultationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
