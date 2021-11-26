import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChucVuComponent } from './form-chuc-vu.component';

describe('FormChucVuComponent', () => {
  let component: FormChucVuComponent;
  let fixture: ComponentFixture<FormChucVuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormChucVuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChucVuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
