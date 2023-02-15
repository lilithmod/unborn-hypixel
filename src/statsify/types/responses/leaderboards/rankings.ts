import { StatsifyError400 } from '../../errors.js'

export type StatsifyLeaderboardRankingsResponse = Array<{
    field: string
    name: string
    rank: number
    value: any
}>
export type StatsifyLeaderboardRankingsResponseWithErrors = StatsifyLeaderboardRankingsResponse | StatsifyError400