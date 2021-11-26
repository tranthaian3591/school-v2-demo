import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { IUserInfo } from '../models/user-token.model';

export type AuthState = IUserInfo

@Injectable({providedIn: 'root'})
export class AuthStore extends ComponentStore<AuthState> {
    readonly fullName$ = this.select((s) => `${s.firstName} ${s.lastName}`);
    readonly setCurrentUser = this.updater((state, user: AuthState) => {
        return {
            ...state,
            ...user
        };
    });

    constructor() {
        super(<AuthState>{});
    }

    readonly getFullName = () => `${this.get().firstName} ${this.get().lastName}`;

    readonly getDoiTuong = () => this.get().doiTuongId;
}
