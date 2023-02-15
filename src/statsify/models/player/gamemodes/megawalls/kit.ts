/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { add, ratio } from '../../../../util/math.js'

const limit = 10_000

export class MegaWallsKit {
    public wins: number

    public losses: number

    public wlr: number

    public kills: number

    public deaths: number

    public kdr: number

    public finalKills: number

    public finalAssists: number

    public finalDeaths: number

    public fkdr: number

    public assists: number

    public playtime: number

    public witherDamage: number

    public witherKills: number

    public points: number

    public constructor(data: APIData, kit: string) {
        kit = kit ? `${kit}_` : kit

        this.wins = data[`${kit}wins`]
        this.losses = data[`${kit}losses`]
        this.wlr = ratio(this.wins, this.losses)

        this.kills = data[`${kit}kills`]
        this.assists = data[`${kit}assists`]
        this.deaths = data[`${kit}deaths`]
        this.kdr = ratio(this.kills, this.deaths)

        this.finalKills = data[`${kit}final_kills`]
        this.finalAssists = data[`${kit}final_assists`]
        this.finalDeaths = data[`${kit}final_deaths`]
        this.fkdr = ratio(this.finalKills, this.finalDeaths)

        this.playtime = (data[`${kit}time_played`] ?? 0) * 60_000
        this.witherDamage = data[`${kit}wither_damage`]
        this.witherKills = data[`${kit}wither_kills`]

        this.points = add(this.finalKills, this.finalAssists, (this.wins ?? 0) * 10)
    }
}

export class MegaWallsOverall extends MegaWallsKit {
    public declare wins: number

    public declare losses: number

    public declare wlr: number

    public declare kills: number

    public declare deaths: number

    public declare kdr: number

    public declare finalKills: number

    public declare finalAssists: number

    public declare finalDeaths: number

    public declare fkdr: number

    public declare assists: number

    public declare playtime: number
}
