export type RedeemableCodePool = {
    id: number;
    code: string;
    expirationTimestamp: string;
    totalRewards: number;
    remainingRewards: number;
    createdAt: Date;
    updatedAt: Date;
    isRedeemed: boolean
} | null


interface FarmingEra {
    profit_per_hour: number;
    duration_seconds: number;
    extend_farm_by_seconds: number;
    max_extendable_times: number;
    update_interval: number;
}

interface CoinPoolConfig {
    coins_per_person: number;
    duration_seconds: number;
}

interface ReferralBonuses {
    joined_bonus: number;
    rewards_bonus_percent: number;
    joined_pass_ticket_gift: number;
    joined_pass_ticket_gift_referer: number;
    joined_pass_ticket_gift_referer_referer: number;
}

interface ReferralRewards {
    bonus_percent: number;
    pass_ticket_gift: number;
}

interface ReferralLimits {
    max_downlines: number;
    max_uplines: number;
}

interface ReferralTimeframes {
    referral_expiration_days: number;
    bonus_payout_days: number;
}

interface ReferralPing {
    max_daily_pings: number;
}

interface ReferralRoles {
    admin: {
        can_manage_users: boolean;
        can_manage_settings: boolean;
    };
    user: {
        can_invite_others: boolean;
        can_earn_rewards: boolean;
    };
}

interface ReferralConfig {
    prefix: string;
    bonuses: {
        regular: ReferralBonuses;
        premium: ReferralBonuses;
    };
    rewards: {
        regular: ReferralRewards;
        premium: ReferralRewards;
    };
    limits: ReferralLimits;
    timeframes: ReferralTimeframes;
    notifications: object;
    ping: ReferralPing;
    roles: ReferralRoles;
}

interface GlobalConfig {
    app_name: string,
    app_short_name: string,
    app_currency_code: string
}

export interface AdminSettings {
    FARMING_ERA_CONFIG: FarmingEra;
    COIN_POOL_CONFIG: CoinPoolConfig;
    REFERRAL_CONFIG: ReferralConfig;
    GLOBAL_CONFIG: GlobalConfig
}