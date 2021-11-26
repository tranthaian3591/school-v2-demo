import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { IMenuSidebar } from '@school-v2/shared/models';
import { delay, map } from 'rxjs/operators';

export interface MenuState {
    menu: IMenuSidebar[] | [];
    menuChild: IMenuSidebar | null;
}

@Injectable({providedIn: 'root'})
export class MenuStore extends ComponentStore<MenuState> {

    readonly menus$ = this.select(s => s.menu);

    readonly menuChilds$ = this.select((s) => s.menuChild).pipe(
        delay(0),
        map(res => res)
    );

    readonly setMenu = this.updater((state, menu: MenuState) => {
        return {
            ...state,
            ...menu
        };
    });

    constructor() {
        super(<MenuState>{});
    }

    readonly getMenuChilds = () => this.get().menuChild;
}
