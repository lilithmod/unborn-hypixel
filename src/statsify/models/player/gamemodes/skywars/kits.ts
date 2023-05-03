import { APIData } from '../../../../util/util.js'
import { ratio } from '../../../../util/math.js'

export class SkywarsMegaKits {

    public armorer: SkywarsKitStats
    public armorsmith: SkywarsKitStats
    public baseballPlayer: SkywarsKitStats
    public cannoneer: SkywarsKitStats
    public fisherman: SkywarsKitStats
    public healer: SkywarsKitStats
    public hellhound: SkywarsKitStats
    public hunter: SkywarsKitStats
    public knight: SkywarsKitStats
    public paladin: SkywarsKitStats
    public pyromaniac: SkywarsKitStats
    public scout: SkywarsKitStats
    public skeletor: SkywarsKitStats
    public witch: SkywarsKitStats

    public constructor(data: APIData) {
        this.armorer = new SkywarsKitStats(data, 'mega_mega_armorer')
        this.armorsmith = new SkywarsKitStats(data, 'mega_mega_armorsmith')
        this.baseballPlayer = new SkywarsKitStats(data, 'mega_mega_baseball-player')
        this.cannoneer = new SkywarsKitStats(data, 'mega_mega_cannoneer')
        this.fisherman = new SkywarsKitStats(data, 'mega_mega_fisherman')
        this.healer = new SkywarsKitStats(data, 'mega_mega_healer')
        this.hellhound = new SkywarsKitStats(data, 'mega_mega_hellhound')
        this.hunter = new SkywarsKitStats(data, 'mega_mega_hunter')
        this.knight = new SkywarsKitStats(data, 'mega_mega_knight')
        this.paladin = new SkywarsKitStats(data, 'mega_mega_paladin')
        this.pyromaniac = new SkywarsKitStats(data, 'mega_mega_pyromaniac')
        this.scout = new SkywarsKitStats(data, 'mega_mega_scout')
        this.skeletor = new SkywarsKitStats(data, 'mega_mega_skeletor')
        this.witch = new SkywarsKitStats(data, 'mega_mega_witch')
    }

}

export class SkywarsKitStats {

    public arrowsHit: number
    public arrowsShot: number
    public assists: number
    public bowKills: number
    public chestsOpened: number
    public deaths: number
    public fastestWin: number
    public gamesPlayed: number
    public kills: number
    public killstreak: number
    public inventory: any
    public farthestBowKill: number
    public farthestBowShot: number
    public losses: number
    public highestKillGame: number
    public survivedPlayers: number
    public timePlayed: number
    public voidKills: number
    public winstreak: number
    public wins: number
    public wlr: number
    public kdr: number

    public constructor(data: APIData, kit: string) {
        kit = kit ? `_kit_${kit}` : kit

        this.arrowsHit = data[`arrows_hit${kit}`] ?? 0
        this.arrowsShot = data[`arrows_shot${kit}`] ?? 0

        this.assists = data[`assists${kit}`] ?? 0
        this.bowKills = data[`bow_kills${kit}`] ?? 0

        this.chestsOpened = data[`chests_opened${kit}`] ?? 0
        this.deaths = data[`deaths${kit}`] ?? 0

        this.fastestWin = data[`fastest_win${kit}`] ?? 0
        this.gamesPlayed = data[`games${kit}`] ?? 0

        this.kills = data[`kills${kit}`] ?? 0
        this.killstreak = data[`killstreak${kit}`] ?? 0

        this.inventory = data[`inventory${kit}`] ?? {}
        this.farthestBowKill = data[`longest_bow_kill${kit}`] ?? 0

        this.farthestBowShot = data[`longest_bow_shot${kit}`] ?? 0
        this.losses = data[`losses${kit}`] ?? 0

        this.highestKillGame = data[`most_kills_game${kit}`] ?? 0
        this.survivedPlayers = data[`survived_players${kit}`] ?? 0

        this.timePlayed = data[`time_played${kit}`] ?? 0
        this.voidKills = data[`void_kills${kit}`] ?? 0

        this.winstreak = data[`winstreak${kit}`] ?? 0
        this.wins = data[`wins${kit}`] ?? 0

        this.wlr = ratio(this.wins, this.losses)
        this.kdr = ratio(this.kills, this.deaths)

    }
}