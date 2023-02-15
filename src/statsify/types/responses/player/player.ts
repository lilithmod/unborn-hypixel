import { StatsifyError400, StatsifyError404 } from '../../errors.js'
import { StatsifyPlayer } from '../../player.js'

export interface StatsifyPlayerResponse {
    success: boolean
    player: StatsifyPlayer
}
export type StatsifyPlayerResponseWithErrors = StatsifyPlayerResponse | StatsifyError400 | StatsifyError404