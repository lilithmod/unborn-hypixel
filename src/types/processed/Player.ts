import { Duels } from './Duels'
import { Bedwars } from './Bedwars'
import { Skywars } from './Skywars'
import { MurderMystery } from './MurderMystery'
import { UHC } from './UHC'
import { WoolGames } from './WoolGames.js'

export interface Player {
    uuid: string
    username: string
nameHistory: string[]
    rank: string
    rankPlusColor: string
    rankF: string
    prefix: string
    karma: number
    exp: number
    level: number
    mcVersion: string
    firstLogin: number
    lastLogin: number
    lastLogout: number
    giftsSent: number
    giftsReceived: number
    links: {
        DISCORD: string
        TWITCH: string
        YOUTUBE: string
        TWITTER: string
        INSTAGRAM: string
        HYPIXEL: string
    }
    stats: {
        Duels?: Duels
        Bedwars?: Bedwars
        Skywars?: Skywars
        MurderMystery?: MurderMystery
        UHC?: UHC
        WoolGames?: WoolGames
    }
}