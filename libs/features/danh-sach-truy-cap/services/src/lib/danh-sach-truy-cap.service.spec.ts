import { TestBed } from '@angular/core/testing';

import { DanhSachTruyCapService } from './danh-sach-truy-cap.service';

describe('DanhSachTruyCapService', () => {
  let service: DanhSachTruyCapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhSachTruyCapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
