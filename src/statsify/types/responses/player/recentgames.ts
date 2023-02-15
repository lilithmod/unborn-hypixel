import { StatsifyError400, StatsifyError404Player } from '../../errors.js'

export interface StatsifyPlayerRecentGamesResponse {
    success: boolean
    recentGames: {
        uuid: string
        displayName: string
        prefixName: string
        games: string[]
    }
}
export type StatsifyPlayerRecentGamesResponseWithErrors = StatsifyPlayerRecentGamesResponse | StatsifyError400 | StatsifyError404Player