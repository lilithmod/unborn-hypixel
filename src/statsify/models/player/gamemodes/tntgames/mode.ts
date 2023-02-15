/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { ratio } from '../../../../util/math.js'

export class BowSpleef {
    public wins: number

    public hits: number

    public losses: number

    public wlr: number

    public constructor(data: APIData) {
        this.wins = data.wins_bowspleef
        this.hits = data.tags_bowspleef
        this.losses = data.deaths_bowspleef
        this.wlr = ratio(this.wins, this.losses)
    }
}

export class PVPRun {
    public wins: number

    public kills: number

    public deaths: number

    public kdr: number

    public constructor(data: APIData) {
        this.wins = data.wins_pvprun
        this.kills = data.kills_pvprun
        this.deaths = data.deaths_pvprun
        this.kdr = ratio(this.kills, this.deaths)
    }
}

export class TNTRun {
    public wins: number

    public losses: number

    public wlr: number

    public record: number

    public constructor(data: APIData) {
        this.wins = data.wins_tntrun
        this.losses = data.deaths_tntrun
        this.wlr = ratio(this.wins, this.losses)
        this.record = (data.record_tntrun ?? 0) * 1000
    }
}

export class TNTTag {
    public wins: number

    public kills: number

    public tags: number

    public constructor(data: APIData, ap: APIData) {
        this.wins = data.wins_tntag
        this.kills = data.kills_tntag
        this.tags = ap?.tntgames_clinic
    }
}

export class Wizards {
    public wins: number

    public kills: number

    public deaths: number

    public kdr: number

    public constructor(data: APIData) {
        this.wins = data.wins_capture
        this.kills = data.kills_capture
        this.deaths = data.deaths_capture
        this.kdr = ratio(this.kills, this.deaths)
    }
}
