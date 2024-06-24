import type { IProfile } from "./IProfile";

export interface IFrens {
    downlines: {
        data: IProfile[],
        limit: number
        page: number
        total: number
        totalPages: number
    },
    upline: IProfile
}