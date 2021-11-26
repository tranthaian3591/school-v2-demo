export interface ITreeSelect {
    title: string;
    value: string;
    key: string;
    capDonVi?: number;
    coQuanTrucThuocId?: number;
    children?: ITreeSelect[];
    isLeaf?: boolean;
    disabled?: boolean;
}
