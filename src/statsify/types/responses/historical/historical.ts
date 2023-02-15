import { StatsifyPlayer } from '../../player.js'
import { StatsifyError400 } from '../../errors.js'

export interface StatsifyHistoricalPlayerResponse {
    success: boolean
    player: StatsifyPlayer
}
export type StatsifyHistoricalPlayerResponseWithErrors = StatsifyHistoricalPlayerResponse | StatsifyError400