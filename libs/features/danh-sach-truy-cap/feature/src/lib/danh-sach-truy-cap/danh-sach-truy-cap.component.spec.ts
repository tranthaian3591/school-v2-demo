import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachTruyCapComponent } from './danh-sach-truy-cap.component';

describe('DanhSachTruyCapComponent', () => {
  let component: DanhSachTruyCapComponent;
  let fixture: ComponentFixture<DanhSachTruyCapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhSachTruyCapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachTruyCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
