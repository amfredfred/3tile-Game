'use strict';

import { defineStore } from 'pinia';

enum LocalStorageKeys {
    IS_GUEST = 'is_guest',
    SHOW_AUTH_MODAL = 'show_auth_modal',
    USER = 'user',
    THEME = 'theme'
}

interface LocalStorageValues {
    [LocalStorageKeys.IS_GUEST]: boolean;
    [LocalStorageKeys.SHOW_AUTH_MODAL]: boolean;
    [LocalStorageKeys.USER]: any | null;
    [LocalStorageKeys.THEME]: string;
}

interface IState {
    show_progress_bar: boolean;
    is_guest: boolean;
    theme: string;
    show_auth_modal: boolean;
    user: any | null;
    internet_ok: boolean;

    overview?: {
        totalScore: number | null
    }
}

const getLocalStorageItem = <K extends LocalStorageKeys>(key: K): LocalStorageValues[K] | null => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(atob(item)) as LocalStorageValues[K] : null;
};

const setLocalStorageItem = <K extends LocalStorageKeys>(key: K, value: LocalStorageValues[K]) => {
    localStorage.setItem(key, btoa(JSON.stringify(value)));
};

const initialState: IState = {
    show_progress_bar: true,
    is_guest: getLocalStorageItem(LocalStorageKeys.IS_GUEST) ?? true,
    theme: getLocalStorageItem(LocalStorageKeys.THEME) ?? 'dark',
    show_auth_modal: getLocalStorageItem(LocalStorageKeys.SHOW_AUTH_MODAL) ?? false,
    user: getLocalStorageItem(LocalStorageKeys.USER),
    internet_ok: false,

    overview: {
        totalScore: null
    }
};

export const useMainStore = defineStore({
    id: 'mainstore',
    state: (): IState => ({
        ...initialState
    }),
    getters: {

    },
    actions: {
        setIsGuestState(state: boolean) {
            setLocalStorageItem(LocalStorageKeys.IS_GUEST, state);
            this.is_guest = state;
        },
        setShowAuthModal(state: boolean) {
            setLocalStorageItem(LocalStorageKeys.SHOW_AUTH_MODAL, state);
            this.show_auth_modal = state;
        },
        setUser(user: any) {
            setLocalStorageItem(LocalStorageKeys.USER, user);
            this.user = user;
            this.setShowAuthModal(false);
            this.setIsGuestState(false);
        },
        setAccountOverview(accountOverview: IState['overview']) {
            this.overview = accountOverview
        }
    },
});

export { initialState, LocalStorageKeys };
