import { StatsifyError400, StatsifyError404WithActions } from '../../errors.js'

export interface StatsifyPlayerStatusResponse {
    success: boolean
    status: {
        actions: {
            firstLogin: number
            lastAction: string
            lastActionTime: number
            lastGame: {
                code: string
                id: string
            }
            lastLogin: number
            lastLogout: number
            online: boolean
            statusHidden: boolean
            version: string
        }
        displayName: string
        game: {
            code: string
            id: string
        }
        map: string
        mode: string
        online: boolean
        prefixName: string
        uuid: string
    }
}
export type StatsifyPlayerStatusResponseWithErrors = StatsifyPlayerStatusResponse | StatsifyError400 | StatsifyError404WithActions