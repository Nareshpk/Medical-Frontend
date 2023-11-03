import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetriealinwardComponent } from './metriealinward.component';

describe('MetriealinwardComponent', () => {
  let component: MetriealinwardComponent;
  let fixture: ComponentFixture<MetriealinwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetriealinwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetriealinwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
