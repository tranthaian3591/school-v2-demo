const prefixACL = 'ACL/';

export const UrlConstant = {
    API: {
        AUTH : 'auth',

        // PERMISSION
        ACL_ACCOUNT: prefixACL + 'Accounts',
        ACL_PERMISSION: prefixACL + 'Permissions',
        ACL_USER: prefixACL + 'Users',
        ACL_USER_DEVICE_DETAIL: prefixACL + 'UserDeviceDetails',
        ACL_PERMISSION_GROUP_USER: prefixACL + 'PermissionGroupUsers',
        ACL_PERMISSION_GROUP: prefixACL + 'PermissionGroups',
        ACL_PERMISSION_GROUP_ACTION: prefixACL + 'PermissionGroupActions',
        ACL_GROUP_CREATION_PERMISSION: prefixACL + 'GroupCreationPermissions',

        // SYSTEM
        SYSTEM: {
            MAN_HINH: prefixACL + 'Functions',
            CHUC_NANG: prefixACL + 'Actions',
            USERS: prefixACL + 'Users',
            MODULES: prefixACL + 'Modules',
        },
    },
    ROUTE: {
        LOGIN: '/login',
        DASHBOARD: '/management',
        FORBIDEN: '/management/403',
        PROFILE: '/management/profile',
        LOGIN_NS: '/management/login-ns',
        MODULE: '/management/module',
    },
};
