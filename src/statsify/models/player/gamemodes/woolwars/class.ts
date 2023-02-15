/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { ratio, sub } from '../../../../util/math.js'

export class WoolWarsClass {
    public kills: number

    public deaths: number

    public kdr: number

    public assists: number

    public powerups: number

    public blocksBroken: number

    public woolPlaced: number

    public constructor(data: APIData = {}) {
        this.kills = data.kills ?? 0
        this.deaths = data.deaths ?? 0
        this.kdr = ratio(this.kills, this.deaths)
        this.assists = data.assists ?? 0

        this.powerups = data.powerups_gotten ?? 0
        this.blocksBroken = data.blocks_broken ?? 0
        this.woolPlaced = data.wool_placed ?? 0
    }
}

export class WoolWarsOverall extends WoolWarsClass {
    public wins: number

    public gamesPlayed: number

    public losses: number

    public wlr: number

    public constructor(data: APIData = {}) {
        super(data)

        this.gamesPlayed = data.games_played ?? 0
        this.wins = data.wins ?? 0
        this.losses = sub(this.gamesPlayed, this.wins)
        this.wlr = ratio(this.wins, this.losses)
    }
}
