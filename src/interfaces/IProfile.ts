export type UserWallet = {
    balance: string;
    created_at: string;
    currency: string;
    id: string;
    name: string | null;
    telegram_id: string;
    updated_at: string;
}

export interface IProfile {
    id: number
    telegram_id: string
    chat_id: string
    username: string
    first_name: string
    last_name: string
    level: string
    bio: string
    location: string
    avatar: string
    website: string
    created_at: string
    updated_at: string
    is_new: boolean,
    wallet?: UserWallet
}
