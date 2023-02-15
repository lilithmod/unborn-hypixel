import { StatsifyError400 } from '../../errors.js'

export interface StatsifyLeaderboardsResponse {
    data: Array<{
        fields: any[][]
        highlight: boolean
        id: string
        name: string
        position: number
    }>
    fields: string[]
    name: string
    page: number
}
export type StatsifyLeaderboardsResponseWithErrors = StatsifyLeaderboardsResponse | StatsifyError400