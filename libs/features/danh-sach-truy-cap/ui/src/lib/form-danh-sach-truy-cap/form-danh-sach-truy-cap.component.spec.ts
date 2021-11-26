import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDanhSachTruyCapComponent } from './form-danh-sach-truy-cap.component';

describe('FormDanhSachTruyCapComponent', () => {
  let component: FormDanhSachTruyCapComponent;
  let fixture: ComponentFixture<FormDanhSachTruyCapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDanhSachTruyCapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDanhSachTruyCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
