type RoleOptions = {
  [key: string]: string
}

export const ListRoleOption: RoleOptions = {
    HRM_0001: 'DuyetTruongDonViAsync',
    HRM_0002: 'DuyetBanTCCBAsync',
    HRM_0003: 'DuyetThongTinNhanSuNSAsync',
    HRM_0004: 'DuyetThongTinNhanSuTDAsync',
    HRM_0005: 'DuyetHopDongAsync',
    HRM_0006: 'UpdateNhatKyLuongAsync',
    HRM_0007: 'CreateNhanSuTuyenDungAsync',
    HRM_0008: 'UpdatingUserSSOAsync',
    HRM_0009: 'CreateCDNNKeHoachAsync',
    HRM_0010: 'UpdateNhanSuVaThongTinChiTietAsync',
    HRM_0011: 'XacNhanKetQuaTuyenNhanSuAsync',
    HRM_0012: 'DuyetUngVienOnlineAsync',
    HRM_0013: 'DuyetDonViDonChuyenCDNNAsync',
    HRM_0014: 'DuyetDHQGHNChuyenCDNNAsync',
    HRM_0015: 'DuyetHoiDongDonViDonChuyenCDNNAsync',
    HRM_0016: 'DuyetHoiDongDHQGHNDonChuyenCDNNAsync',
    HRM_0017: 'CreateDonDeAnVtvlAsync',
    HRM_0018: 'BanHanhQuyetDinhDeAnVtvlAsync',
    HRM_0019: 'XacNhanNgayPhep',
    HRM_0020: 'HuyDangKy',
    HRM_0021: 'CapNhatNgayNghiPhepNam',
    HRM_0022: 'DonViXacNhan',
    HRM_0023: 'XacNhanNgayNghiKhongLuongAsync',
    HRM_0024: 'HuyDangKyNghiKhongLuongAsync',
    HRM_0025: 'CapNhatNgayNghiKhongLuongThucTeAsync',
    HRM_0026: 'AdministratorChangePassword',
    HRM_0027: 'AdministratorChangePasswordNhanSuNgoai',
    HRM_0028: 'DuyetDonBanTCCBAsync',
    HRM_0029: 'TaoPhuLucHopDongAsync',
    HRM_0030: 'UpdateLoaiLuongAsync',
    HRM_0031: 'ViewInfoUser',

    NBL_0001: 'DongBoNhanSuNangBacLuongAsync',

    DGNS_0001: 'YKienThamMuuBanTCCB',
    DGNS_0002: 'XetDuyetDanhGiaCap3Async',
    DGNS_0003: 'XetDuyetDanhGiaCap4Async',
    DGNS_0004: 'XetDuyetDanhGiaCap2Async',
    DGNS_0005: 'XetDuyetDanhGiaCapVanPhongAsync',

    PTN_0001: 'DuyetDangKySuDungAsync',
    PTN_0002: 'DuyetTB_MangRaNgoaiAsync',
    PTN_0003: 'IsQuyenBanKHCNTheoLoaiHinh',
    PTN_0004: 'IsQuyenBanKHCNTheoLinhVuc',
    PTN_0005: 'IsQuyenPhongKHCNLuanAnLuanVan',
    PTN_0006: 'IsQuyenPhongKHCNBaiThucHanh',
    PTN_0007: 'IsQuyenPhongKHCNBaoCaoKhoaHoc',
    PTN_0008: 'IsQuyenPhongKHCNBaiBaoKhoaHoc',
    PTN_0009: 'IsQuyenPhongKHCNNhiemVuKhoaHoc',
    PTN_0010: 'IsQuyenPhongKHCNHoiNghiHoiThao',
    PTN_0011: 'IsQuyenPhongKHCNHopDongKhaiThac',
    PTN_0012: 'IsQuyenPhongKHCNSoHuuTriTue',
    PTN_0013: 'IsQuyenPhongKHCNSanPhamKHCN',
    PTN_0014: 'IsQuyenPhongKHCNHieuQuaSuDung',
    PTN_0015: 'CreateDoiNguCanBoAsync',
    PTN_0016: 'UpdateDoiNguCanBoAsync',
    PTN_0017: 'DeleteDoiNguCanBoAsync',
    PTN_0018: 'GetDoiNguCanBoByIdAsync',

    PTN_0020: 'TinhKhauHaoThietBi',
    PTN_0021: 'KhoaDotKhauHao',

    PTN_0022: 'CreateNhomNghienCuuAsync',
    PTN_0023: 'UpdateNhomNghienCuuAsync',
    PTN_0024: 'DeleteNhomNghienCuuAsync',
    PTN_0025: 'GetNhomNghienCuuByIdAsync',

    PTN_0026: 'CreateHopDongKhaiThacAsync',
    PTN_0027: 'UpdateHopDongKhaiThacAsync',
    PTN_0028: 'DeleteHopDongKhaiThacAsync',
    PTN_0029: 'GetHopDongKhaiThacByIdAsync',

    PTN_0030: 'CreateBaiThucHanhThiNghiemAsync',
    PTN_0031: 'UpdateBaiThucHanhThiNghiemAsync',
    PTN_0032: 'DeleteBaiThucHanhThiNghiemAsync',
    PTN_0033: 'GetBaiThucHanhThiNghiemByIdAsync',

    PTN_0034: 'CreateDoiTacThucHienAsync',
    PTN_0035: 'UpdateDoiTacThucHienAsync',
    PTN_0036: 'DeleteDoiTacThucHienAsync',
    PTN_0037: 'GetDoiTacThucHienByIdAsync',

    PTN_0038: 'GetDataListAsync',

    PTN_0039: 'CreateKH_KeHoachAsync',
    PTN_0040: 'UpdateKH_KeHoachAsync',
    PTN_0041: 'DeleteKH_KeHoachAsync',
    PTN_0042: 'GetKH_KeHoachByIdAsync',

    PTN_0043: 'CreateTB_ThietBiAsync',
    PTN_0044: 'UpdateTB_ThietBiAsync',
    PTN_0045: 'DeleteTB_ThietBiAsync',
    PTN_0046: 'GetTB_ThietBiByIdAsync',
    PTN_0047: 'GetDanhSachThietBiAsync',

    PTN_0060: 'IsBanKHCNBaoCaoChiTieuKeHoach',
    PTN_0061: 'IsQuyenPhongKHCNDoiTacThucHien',
    PTN_0062: 'IsQuyenPhongKHCNNhomNghienCuu',
    PTN_0063: 'IsQuyenPhongKHCNHopDongKhaiThac',
    PTN_0064: 'IsQuyenPhongKHCNBaiThucHanhThiNghiem',
    PTN_0065: 'IsQuyenPhongKHCNDoiNguCanBo',
    PTN_0066: 'IsQuyenPhongKHCNKetQuaKHCNChiTiet',
    PTN_0067: 'DieuChuyenTB_ThietBiAsync',

    KHCN_0001: 'BaiBaoKhoaHocChangeStatusAsync',
    KHCN_0002: 'BaoCaoKhoaHocChangeStatusAsync',
    KHCN_0003: 'DuAnDauTuChangeStatusAsync',
    KHCN_0004: 'GiaiThuongKHCNChangeStatusAsync',
    KHCN_0005: 'HoiThaoHoiNghiChangeStatusAsync',
    KHCN_0006: 'PhatMinhSangCheChangeStatusAsync',
    KHCN_0007: 'NhiemVuKhoaHocChangeStatusAsync',
    KHCN_0008: 'SachChuyenKhaoChangeStatusAsync',
    KHCN_0009: 'SanPhamDaoTaoChangeStatusAsync',
    KHCN_0010: 'ExportExcel',
    KHCN_0011: 'AddKinhPhiThucHien',
    KHCN_0012: 'AddKinhPhiThucHienDuAn',
    KHCN_0013: 'DVCreateKH_PhanCongThucHienAsync',
    KHCN_0014: 'DonViTongHopDuLieuAsync',
    KHCN_0015: 'BanTongHopDuLieuAsync',
    KHCN_0016: 'IsBanKHCNBieuDoTongHop',
    KHCN_0017: 'IsBanKHCNBieuDoBaiBao',
    KHCN_0018: 'IsBanKHCNBieuDoSachChuyenKhao',
    KHCN_0019: 'IsBanKHCNBieuDoSoHuuTriTue',
    KHCN_0020: 'IsFullQuyenKHCN',
    KHCN_0021: 'DonViChuyenTrangThaiKeHoachAsync',
    KHCN_0022: 'BanChuyenTrangThaiKeHoachAsync',
    KHCN_0023: 'BanCreateKH_PhanCongThucHienAsync',
    KHCN_0024: 'CreateKH_KeHoachDonViAsync',
    KHCN_0025: 'CreateKH_KeHoachBanAsync',
    KHCN_0026: 'PhatMinhSangChe_V2ChangeStatusAsync',
};