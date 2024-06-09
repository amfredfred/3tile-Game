export interface IFarmingEra {
    id: number;
    session_id: string;
    start_timestamp: string;
    end_timestamp: string;
    extended_times: number;
    claimable_reward: number;
    is_claimed: boolean;
    is_ended: boolean;
    is_farming: boolean
    created_at: string;
    updated_at: string;
    remainingTime: {
        fomarted: string,
        left_timestamp: number
    }
}
