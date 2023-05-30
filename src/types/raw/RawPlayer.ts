import { RawBlitz } from './RawBlitz'
import { RawUHC } from './RawUHC'
import { RawMegaWalls } from './RawMegaWalls'
import { RawSkywars } from './RawSkywars'
import { RawBedwars } from './RawBedwars'
import { RawMurderMystery } from './RawMurderMystery'
import { RawDuels } from './RawDuels'
import { RawWoolGames } from './RawWoolGames.js'

export interface RawPlayer {
    _id?: string
    achievements?: {
        [achievement: string]: number
    }
    achievementsOneTime?: string[]
    achievement_points?: number
    auto_spawn_pet?: boolean
    channel?: string
    chat?: boolean
    disguise?: string
    displayname?: string
    eulaCoins?: boolean
    fireworkStorage?: Array<{
        flight_duration?: number
        shape?: string
        trail?: boolean
        twinkle?: boolean
        colors?: string
        fade_colors?: string
        selected?: boolean
    }>
    firstLogin?: number
    friendRequests?: string[]
    friendRequestsUuid?: string[]
    gadget?: string
    karma?: number
    uuid?: string
    giftingMeta?: {
        realBundlesReceived?: number
        bundlesReceived?: number
        giftsGiven?: number
        bundlesGiven?: number
        realBundlesGiven?: number
        milestones?: string[]
    }
    knownAliases?: string[]
    mcVersionRp?: string
    lastLogin?: number
    lastLogout?: number
    packageRank?: string
    newPackageRank?: string
    monthlyPackageRank?: string
    rank?: string
    rankPlusColor?: string
    monthlyRankColor?: string
    networkExp?: number
    socialMedia?: {
        links?: {
            DISCORD?: string
            TWITTER?: string
            YOUTUBE?: string
            TWITCH?: string
            INSTAGRAM?: string
            HYPIXEL?: string
        }
        prompt?: boolean
    }
    totalRewards?: number
    rewardStreak?: number
    rewardScore?: number
    rewardHighScore?: number
    notifications?: boolean
    parkourCompletions?: any
    timePlaying?: number
    prefix?: string
    stats?: {
        HungerGames?: RawBlitz
        UHC?: RawUHC
        Walls3?: RawMegaWalls
        SkyWars?: RawSkywars
        Bedwars?: RawBedwars
        MurderMystery?: RawMurderMystery
        Duels?: RawDuels
        WoolGames?: RawWoolGames
    }
}