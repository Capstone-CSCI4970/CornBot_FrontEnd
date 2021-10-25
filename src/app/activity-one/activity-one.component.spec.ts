import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityOneComponent } from './activity-one.component';

describe('ActivityOneComponent', () => {
  let component: ActivityOneComponent;
  let fixture: ComponentFixture<ActivityOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
