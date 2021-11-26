import { Inject, Injectable, isDevMode } from '@angular/core';
import { ApiService } from '@school-v2/shared/services';
import { MenuStore } from './menu.store';
import { SubFolder, UrlConstant } from '@school-v2/constant';
import { tap } from 'rxjs/operators';
import { IMenuSidebar } from '@school-v2/shared/models';
import { Router } from '@angular/router';
import { isDefined, SafeAny, SecurityUtil } from '@school-v2/shared/utils';
import { APP_CONFIG, IEnvironmentConfig } from '@school-v2/web-config';
import { of } from 'rxjs';

const PrefixUrl = SubFolder;

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private keyMenuChild = '_key_menu_child';
    private keyStorageMenu = '_key_menu';
    private arrayTitleOfHeader: string[] = [];

    constructor(
        private apiService: ApiService,
        private store: MenuStore,
        private router: Router,
        @Inject(APP_CONFIG) private env: IEnvironmentConfig
    ) {

    }

    initMenu() {
      // tam thoi comment code (demo)
      return of(true);
        // return this.apiService
        //            .post(UrlConstant.API.ACL_ACCOUNT + '/GetMenuPage', {})
        //            .pipe(
        //                tap(res => {
        //                    this.setMenu(res);
        //                })
        //            );
    }

    getNodeParent(toUrl?: string) {
        const path = toUrl ? toUrl : location.pathname;
        const menus = this.getMenuStorage();
        const node = this.checkList(menus, path);
        if (!node || node.length < 1 || path.endsWith('/thong-tin-nhan-su')) {
            return;
        }

        return menus.find(m => m.mod === node[0].mod);
    }

    setMenu(menus: IMenuSidebar[]) {
        const body = {
            menu     : menus,
            menuChild: this.getMenuChildLocalStorage()
        };
        this.store.setMenu(body);
        this.setMenuStorage(menus);
    }

    setMenuChilds(menu: IMenuSidebar, toUrl?: string) {
        if (menu && menu.subMenu) {
            menu.subMenu.map(m => m.isActive = true);
            menu.subMenu.map(m => {
                if (m.subMenu) {
                    m.subMenu.map((x: SafeAny) => {
                        let currentURL = location.pathname;
                        if (toUrl) {
                            currentURL = toUrl;
                        }
                        x.isActive = convertUrl(x.link) === convertUrl(currentURL);
                    });
                }
            });
        }

        const body = {
            menu     : this.getMenuStorage(),
            menuChild: menu
        };

        this.store.setMenu(body);
        this.setMenuChildLocalStorage(menu);
    }

    setMenuChildIsNull() {
        const body = {
            menu     : this.getMenuStorage(),
            menuChild: null
        };
        localStorage.removeItem(this.keyMenuChild);
        this.store.updater(state => {
            return {
                ...state.menuChild,
                ...body,
            };
        });
    }

    setMenuStorage(menus: SafeAny) {
        localStorage.setItem(this.keyStorageMenu, <string>SecurityUtil.set(JSON.stringify(menus)));
    }

    getMenuStorage(): IMenuSidebar[] {
        try {
            return JSON.parse(<string>SecurityUtil.get(localStorage.getItem(this.keyStorageMenu) as string));
        } catch (e) {
            return [];
        }
    }

    setMenuChildLocalStorage(menu: IMenuSidebar) {
        localStorage.setItem(this.keyMenuChild, JSON.stringify(menu));
    }

    getMenuChildLocalStorage() {
        const local = localStorage.getItem(this.keyMenuChild);
        if (local) {
            return JSON.parse(local);
        }

        const currentURL = location.pathname;
        const menus = this.getMenuStorage();
        if (!menus) return;
        const index = menus.findIndex(m => m.isActive);
        if (index < 0) {
            return;
        }

        const menu = menus[index];
        if (!isDefined(menu) || !isDefined(menu.subMenu)) return;
        menu.subMenu.map(m => {
            if (m.subMenu) {
                m.subMenu.map(x => {
                    if (x.link === currentURL) {
                        m.isActive = true;
                        x.isActive = true;
                    } else {
                        x.isActive = false;
                    }
                });
            }
        });
        return menu;
    }

    getListOptionWithCurrentUrl() {
        const currentURL = this.router.url;
        const listData = this.checkList(this.getMenuStorage(), currentURL);
        if (listData.length > 0) {
            return this.getValueType(listData[0]);
        }
        return [];
    }

    getPermissionWithCurrentUrl() {
        const menus = this.getMenuStorage();
        const currentURL = location.pathname;
        const listData = this.checkList(menus, currentURL);
        if (listData.length > 0) {
            return this.getValueType(listData[0]);
        }
        return [];
    }

    getValueType(menu: IMenuSidebar): SafeAny {
        if (!menu || !menu.subMenu) return;
        if (menu && menu.subMenu && menu.subMenu.length === 0) {
            return menu.types;
        }

        return this.getValueType(menu.subMenu[0]);
    }

    getTitleWithCurrentUrl(redirect?: string): string {
        const menus = this.getMenuStorage();
        const currentURL = redirect ? redirect : location.pathname;
        if (menus && menus.length > 0) {
            const url = currentURL.split('?');

            const listData = this.checkList(menus, url[0]);
            if (listData.length > 0) {
                return this.getDescription(listData[0]);
            }
        }

        if (currentURL === UrlConstant.ROUTE.FORBIDEN) {
            return 'Không có quyền truy cập';
        }
        return '';
    }

    getBreacumbFromUrl(redirect?: string): SafeAny  {
        this.arrayTitleOfHeader = [];
        const title = this.getTitleWithCurrentUrl(redirect);
        if (title) {
            return this.arrayTitleOfHeader;
        }
    }

    getDescription(menu: IMenuSidebar): SafeAny {
        if (!menu || !menu.subMenu) return;
        if (menu.subMenu.length === 0) {
            return menu.title;
        }
        return this.getDescription(menu.subMenu[0]);
    }

    checkList(items: IMenuSidebar[], url: string): IMenuSidebar[] {
      if(!items) {
        return [];
      }
        return items.reduce((acc: IMenuSidebar[], item) => {
            if (item && item.subMenu && contains(item.link as string, url) && item.subMenu.length === 0) {
                if (item.title) {
                    this.arrayTitleOfHeader.push(item.title);
                }
                acc.push(item);
            } else if (item.subMenu && item.subMenu.length > 0) {
                const newItems = this.checkList(item.subMenu, url);
                if (newItems.length > 0) {
                    if (item.title) {
                        this.arrayTitleOfHeader.push(item.title);
                    }
                    acc.push({
                        css     : item.css,
                        cssBadge: item.cssBadge,
                        title   : item.title,
                        link    : item.link,
                        types   : item.types,
                        isActive: item.isActive,
                        subMenu : newItems,
                        options : item.options,
                        mod     : item.mod
                    });
                }
            }
            return acc;
        }, []);
    }
}

function contains(link: string, url: string): boolean {
    return convertUrl(link) === convertUrl(url);
}

function convertUrl(link: string) {
    if (!link) {
        return '';
    }

    link = link.toUpperCase();
    if (!link.startsWith('/')) {
        link = '/' + link;
    }

    if (isDevMode()) {
        for (const value of Object.values(PrefixUrl)) {
            if (link.startsWith('/' + value)) {
                link = link.slice(value.length + 1);
                break;
            }
        }
    }
    return link;
}
