import { ColorCodeHex, ColorCodeNames, ColorCodeNotch } from './colors.js'

export interface StatsifyPlayer {
    cached: boolean
    displayName: string
    expiresAt: number
    guildId: string
    isNew: boolean
    lastReset: number
    nextReset: number
    plusColor: {
        code: ColorCodeNotch
        hex: ColorCodeHex
        id: ColorCodeNames
    }
    prefixName: string
    rank: string
    resetMinute: number
    socials: any
    stats: any
    status: any
    username: string
    usernameToLower: string
    uuid: string
}