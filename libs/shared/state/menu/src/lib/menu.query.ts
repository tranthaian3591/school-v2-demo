import { Injectable } from '@angular/core';
import { MenuStore } from './menu.store';
import { MenuService } from './menu.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MenuQuery {
    menus$ = this.store.menus$.pipe(
        map(s => {
            if (!s) {
                return this.service.getMenuStorage();
            }
            return s;
        })
    )

    menuChilds$ = this.store.menuChilds$.pipe(
        map(s => {
            if (!s) {
                return this.service.getMenuChildLocalStorage();
            }
            return s;
        })
    )
    constructor(
        private store: MenuStore,
        private service: MenuService
    ) {
    }

}
