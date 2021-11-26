export enum ActionEnum {
    CREATE = 1,
    UPDATE = 2,
    DUPLICATE = 3,
    DELETE = 4,
    VIEW = 5,
    APPROVE = 6,
    BAN_HANH = 7,
    BAN_HANH_QUYET_DINH = 8,
}

export enum ActionTypeEnum {
    VIEW = 0,
    CREATE = 1,
    DELETE = 2,
    EDIT = 3,
    OPTION = 4,
}

export enum LangEnum {
    VI = 'vi',
    EN = 'en',
}

export enum CulturesEnum {
    vi_VN = 1,
    en_US = 2
}

export const CultureDescription = {
    [CulturesEnum.vi_VN]: 'vi_VN',
    [CulturesEnum.en_US]: 'en_US'
}

export enum ActionType {
    VIEW = 1,
    CREATE = 2,
    UPDATE = 3,
    DELETE = 4,
}

export enum FileExtensionEnum {
    DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    PDF = 'application/pdf',
    XLXS = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    JPG = 'image/jpeg',
    PNG = 'image/png',
}
