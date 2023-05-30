/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */


import { Color } from '../color'
import { PlayerSocials } from './socials'
import { PlayerStats } from './stats'
import { PlayerStatus } from './status'
import { PlayerUtil } from './util'
import { RawPlayer } from '../../../types/raw/RawPlayer'


export class StatsifyPlayer {

    public rawData: RawPlayer

    public uuid: string

    public username: string

    public usernameToLower: string

    public rank: string = 'DEFAULT'

    public plusColor: Color

    // The player's name with their rank color as seen in game lobbies
    // e.g. §bj4cobi
    public prefixName: string

    // The player's name with their formatted rank
    // e.g. §b[MVP§c+] j4cobi
    public displayName: string

    public socials: PlayerSocials

    public stats: PlayerStats

    public status: PlayerStatus

    // The time the player's cache expires
    public expiresAt: number

    // The minute the player's historical stats reset
    public resetMinute?: number

    // The time the player's historical stats reset
    public nextReset?: number

    // The time the player's historical stats last reset
    public lastReset?: number

    // The time the player's session stats last reset
    public sessionReset?: number

    public cached?: boolean

    public isNew?: boolean

    public guildId?: string

    public constructor(data: RawPlayer = {}) {
        this.rawData = data

        this.uuid = data.uuid
        this.username = data.displayname
        this.usernameToLower = this.username?.toLowerCase()

        this.rank = PlayerUtil.getRank(data)
        this.plusColor = PlayerUtil.getPlusColor(this.rank, data?.rankPlusColor)
        this.prefixName = `${PlayerUtil.getRankColor(this.rank).toString()}${this.username}`
        this.displayName = PlayerUtil.getDisplayName(
            this.username,
            this.rank,
            this.plusColor.code
        )

        this.socials = new PlayerSocials(data?.socialMedia?.links ?? {})
        this.stats = new PlayerStats(data)
        this.status = new PlayerStatus(data)

        //These will all be filled in by a service
        this.expiresAt = 0
        this.resetMinute = 0
        this.nextReset = 0
        this.lastReset = 0
    }
}

export * from './gamemodes'
export * from './socials'
export * from './stats'
export * from './status'
