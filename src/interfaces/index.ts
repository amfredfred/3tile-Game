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