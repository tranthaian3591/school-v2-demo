export const AppConstant = {
    VERSION: Math.floor(Math.random() * 999999),
    SSO_LINK: (arg: any) =>
        // eslint-disable-next-line max-len
        `/auth/realms/vnu/protocol/openid-connect/auth?kc_locale=vi&scope=openid&response_type=code&client_id=hrm&redirect_uri=${arg}/oauth/callback`,
    SSO_LOGOUT: (arg: any) => `/auth/realms/vnu/protocol/openid-connect/logout?kc_locale=vi&redirect_uri=${arg}/login?kc_locale%3Dvi`,
    NO_AVATAR_URL: './assets/images/no-avatar.jpg',
    CURRENT_LANG: 'current_lang',
    TITLE: 'Thông báo',
    TYPE: {
        SUCCESS: 'success',
        DANGER: 'danger',
        WARNING: 'warning',
    },
    NO_IMAGE_URL: '',
};

export const FOLDER = {
    PDG_CongViec: 'PDG_CongViec',
    PDG_NhiemVu: 'PDG_NhiemVu',
    PDGQ_NhiemVu: 'PDGQ_NhiemVu',
    PDGQ_YThuc: 'PDGQ_YThuc',
    NS_NhanSu_ChiTiet: 'NS_NhanSu_ChiTiet',
    NS_NhanSu_TuyenDung: 'NS_NhanSu_TuyenDung',
    NS_NhanSu_TrinhDo: 'NS_NhanSu_TrinhDo',
    NS_NhanSu_TrinhDoChuyenMon: 'NS_NhanSu_TrinhDoChuyenMon',
    NS_NhanSu_DaoTaoBoiDuong: 'NS_NhanSu_DaoTaoBoiDuong',
    NS_NhanSu_TrinhDoNgoaiNgu: 'NS_NhanSu_TrinhDoNgoaiNgu',
    NS_NhanSu_TrinhDoTinHoc: 'NS_NhanSu_TrinhDoTinHoc',
    NS_NhanSu_ChucDanhKhoaHoc: 'NS_NhanSu_ChucDanhKhoaHoc',
    NS_NhanSu_DoanDang: 'NS_NhanSu_DoanDang',
    NS_NhanSu_QuaTrinhDoan: 'NS_NhanSu_QuaTrinhDoan',
    NS_NhanSu_QuaTrinhDang: 'NS_NhanSu_QuaTrinhDang',
    NS_NhanSu_QuaTrinhCongDoan: 'NS_NhanSu_QuaTrinhCongDoan',
    NS_NhanSu_KhenThuong: 'NS_NhanSu_KhenThuong',
    NS_NhanSu_KyLuat: 'NS_NhanSu_KyLuat',
    NS_NhanSu_DanhHieuThiDua: 'NS_NhanSu_DanhHieuThiDua',
    NS_NhanSu_SucKhoe: 'NS_NhanSu_SucKhoe',
    NS_NhanSu_QuaTrinhCongTac: 'NS_NhanSu_QuaTrinhCongTac',
    NS_NhanSu_KiemNhiem: 'NS_NhanSu_KiemNhiem',
    NS_NhanSu_QuanHeGiaDinh: 'NS_NhanSu_QuanHeGiaDinh',
    NS_NhanSu_Luong: 'NS_NhanSu_Luong',
    NS_HopDong: 'NS_HopDong',
    NS_BaoCao: 'NS_BaoCao',
    TD_DinhBien: 'TD_DinhBien',
    TD_KeHoach: 'TD_KeHoach',
    TD_HopDongTuyenDung: 'TD_HopDongTuyenDung',
    TD_QuyetDinhTuyenDung: 'TD_QuyetDinhTuyenDung',
    TS_BaoCaoCaNhan: 'TS_BaoCaoCaNhan',
    TS_PhanCongHuongDanTapSu: 'TS_PhanCongHuongDanTapSu',
    HINH_DAI_DIEN: 'NS_HinhNhanSu',
    FOLDER_FUNCTION: 'FolderFunc',
    PTN_PHONG_THI_NGHIEM: 'PTN_PhongThiNghiems',
    KHCN_KHOA_HOC_CONG_NGHE: 'KHCN_KhoaHocCongNghes',
    CONG_VAN_DINH_KEM: 'CongVanDinhKem',
    TD_XAC_NHAN_KQ: 'TD_XacNhanKetQuaNs',
    UNG_TUYEN_ONLINE: 'UngTuyenOnline',
    DON_XIN_CHAM_DUT: 'DT_DonXinChamDut',
    DON_XIN_NGHI_PHEP: 'DT_DonXinChamDutNghiPhep',
    THONG_BAO_NGHI_HUU: 'DT_ThongBaoNghiHuu',
    QD_XIN_NGHI_KHONG_LUONG: 'DT_QuyetDinhNghiKhongLuong',
    DE_XUAT_KHTD: 'DT_DeXuatKhtd',
    DE_XUAT_DE_AN_VTVL: 'DT_DeXuatDeAnVTVL',
    QUYET_DINH_DON_TU: 'QuyetDinhDonTu',
    NSXL_NANG_BAC_LUONG: 'NSXL_NangBacLuong',
    NSXL_NANG_CDNN: 'NSXL_NangCDNN',
    CDNN_DANH_MUC_HO_SO: 'CDNN_DanhMucHoSo',
    CDNN_DE_NGHI_CHUYEN_CDNN: 'CDNN_DeNghiChuyenCDNN',
    CDNN_KET_LUAN_HOI_DONG: 'CDNN_KetLuanHoiDong',
    CDNN_QUYET_DINH_THANH_LAP_HOI_DONG: 'CDNN_QuyetDinhThanhLapHoiDong',
    CDNN_DE_XUAT_KE_HOACH: 'CDNN_DeXuatKeHoach',
    KEO_DAI_TIME_CTAC: 'DT_KeoDaiThoiGianCTac',
    DCNB_PHU_LUC_HOP_DONG: 'DCNB_PhuLucHopDong',
};

export const PageConfig = {
    buttonCount: 5,
    pageSizes: [10, 20, 50],
    previousNext: true,
};

export const PageConfigExtra = {
    buttonCount: 5,
    pageSizes: [50, 100, 150, 300],
    previousNext: true,
};

export const ModalDeleteConfig = {
    title: 'Bạn có muốn xóa dòng này ?',
    content: '<b style="color: red;">Xác nhận xóa</b>',
    yes: 'Đồng ý',
    no: 'Không',
};

export const ReziseTable = 260;

export const SubFolder = {
    APTN: 'APTN',
    AKHCN: 'AKHCN',
    KHCN: 'KHCN'
};

export const BADGE_SIDEBAR = {
    NBL_DUYET_DON_VI: 'badge_nbl_duyetcapdonvi',
    NBL_DUYET_BAN_TCCB: 'badge_nbl_duyetcapban',
    DGNS_PHIEU_DANH_GIA: 'badge_xl_phieudanhgia'
}
