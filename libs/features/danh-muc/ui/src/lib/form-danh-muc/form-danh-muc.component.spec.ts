import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDanhMucComponent } from './form-danh-muc.component';

describe('FormDanhMucComponent', () => {
  let component: FormDanhMucComponent;
  let fixture: ComponentFixture<FormDanhMucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDanhMucComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDanhMucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
