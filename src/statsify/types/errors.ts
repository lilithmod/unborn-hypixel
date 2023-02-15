import { StatsifyPlayerResponse } from './responses.js'

export interface StatsifyError {
    statusCode: number,
    error: string
}

export interface StatsifyError400 extends StatsifyError {
    message: string[]
}
export interface StatsifyError404 extends StatsifyError {
    message: string
}
export interface StatsifyError404Player extends StatsifyError404 {
    uuid: string
    displayName: string
    prefixName: string
}
export interface StatsifyError404WithActions extends StatsifyError404Player {
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
}