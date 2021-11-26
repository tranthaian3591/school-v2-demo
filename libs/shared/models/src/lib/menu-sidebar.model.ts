export interface IMenuSidebar {
    css?: string;
    cssBadge?: string;
    title?: string;
    shortName?: string;
    link?: string;
    types?: string;
    isActive?: boolean;
    subMenu?: IMenuSidebar[];
    options?: IKeyOption[];

    isAnimationState?: boolean;
    isReference?: number;
    groups?: IMenuSidebarGroup[];
    mod?: string;
    modDesc?: string;
    modGroupName?: string;
    modIcon?: string;
    notis?: number;
    isHide?: boolean;
}

export interface IMenuSidebarGroup {
    arr: IMenuSidebar[];
}

export interface IKeyOption {
    key: string;
    title: string;
}
