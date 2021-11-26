export interface ITreeSelectRole {
    title: string;
    value: string;
    key: string;
    capDonVi?: number;
    coQuanTrucThuocId?: number;
    children?: ITreeSelectRole[];
    isLeaf?: boolean;
}
