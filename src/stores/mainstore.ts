'use strict';

import type { AdminSettings, RedeemableCodePool } from '@/interfaces';
import type { IFarmingEra } from '@/interfaces/IFarmingEra';
import type { ITriviaSession } from '@/interfaces/ITrivia';
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
    },
    triviaSession?: ITriviaSession
    farmingEra?: IFarmingEra | null
    redeemableCodePool?: RedeemableCodePool,
    is_new: boolean
    is_server_error: boolean
    admin_settings: AdminSettings | null
}

const getLocalStorageItem = <K extends LocalStorageKeys>(key: K): LocalStorageValues[K] | null => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(atob(item)) as LocalStorageValues[K] : null;
};

const setLocalStorageItem = <K extends LocalStorageKeys>(key: K, value: LocalStorageValues[K]) => {
    localStorage.setItem(key, btoa(JSON.stringify(value)));
};

const tgUser = () => ((window as any).Telegram)?.WebApp?.initDataUnsafe?.user

const initialState: IState = {
    show_progress_bar: true,
    is_guest: getLocalStorageItem(LocalStorageKeys.IS_GUEST) ?? true,
    theme: getLocalStorageItem(LocalStorageKeys.THEME) ?? 'dark',
    show_auth_modal: getLocalStorageItem(LocalStorageKeys.SHOW_AUTH_MODAL) ?? false,
    user: getLocalStorageItem(LocalStorageKeys.USER),
    internet_ok: false,

    overview: {
        totalScore: null
    },
    farmingEra: null,
    redeemableCodePool: null,
    is_new: false,
    is_server_error: false,
    admin_settings: null
};

export const useMainStore = defineStore({
    id: 'mainstore',
    state: (): IState => ({
        ...initialState
    }),
    getters: {
        tgUser: () => tgUser,
        currency() {
            this.admin_settings?.GLOBAL_CONFIG.app_short_name
        }
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
        },
        setTriviaSession(triviaSession: ITriviaSession) {
            this.triviaSession = triviaSession
        },
        setFarmingEra(farmingEra: IFarmingEra) {
            this.farmingEra = farmingEra
        },
        setRedeemableCodePool(pool?: RedeemableCodePool) {
            this.redeemableCodePool = pool
        },
        setIsNew(is_new: boolean) {
            this.is_new = is_new
        },
        setServerError(is_server_error: boolean) {
            this.is_server_error = is_server_error
        },
        setAdminSettings(settings: AdminSettings) {
            console.log({ settings })
            this.admin_settings = settings
        }
    },
});

export { initialState, LocalStorageKeys, tgUser };