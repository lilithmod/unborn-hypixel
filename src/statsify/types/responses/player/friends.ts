import { StatsifyError400, StatsifyError404 } from '../../errors.js'

export interface StatsifyPlayerFriendsResponse {
    success: boolean
    data: {
        cached: boolean
        displayName: string
        expiresAt: number
        friends: Array<{
            createdAt: number
            displayName: string
            uuid: string
        }>
        uuid: string
    }
}
export type StatsifyPlayerFriendsResponseWithErrors = StatsifyPlayerFriendsResponse | StatsifyError400 | StatsifyError404