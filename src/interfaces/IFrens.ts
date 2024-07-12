import type { IProfile } from "./IProfile";

export interface IReferralInfo {
    downlines_count: number
    rewards_to_upline: number
    created_at: Date
    wallet_balance: number
    referral_code:string
}
export interface IFrens {
    downlines: {
        frens: IReferralInfo[],
        limit: number
        page: number
        total: number
        totalPages: number
    },
    upline: IProfile
    referral_code?: string
    referral_slots?: number
}