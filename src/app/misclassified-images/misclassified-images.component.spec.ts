import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisclassifiedImagesComponent } from './misclassified-images.component';

describe('MisclassifiedImagesComponent', () => {
  let component: MisclassifiedImagesComponent;
  let fixture: ComponentFixture<MisclassifiedImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisclassifiedImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisclassifiedImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
