/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { ratio } from '../../../../util/math.js'

export class SmashHeroesMode {
    public wins: number

    public losses: number

    public wlr: number

    public kills: number

    public deaths: number

    public kdr: number

    public constructor(data: APIData, mode: string) {
        mode = mode ? `_${mode}` : mode

        this.wins = data[`wins${mode}`]
        this.losses = data[`losses${mode}`]
        this.kills = data[`kills${mode}`]
        this.deaths = data[`deaths${mode}`]

        this.wlr = ratio(this.wins, this.losses)
        this.kdr = ratio(this.kills, this.deaths)
    }
}

export class SmashHeroesKit {
    public wins: number

    public losses: number

    public wlr: number

    public kills: number

    public deaths: number

    public kdr: number

    public constructor(kit: string, data: APIData = {}) {
        this.wins = data[kit]?.wins
        this.losses = data[kit]?.losses
        this.kills = data[kit]?.kills
        this.deaths = data[kit]?.deaths

        this.wlr = ratio(this.wins, this.losses)
        this.kdr = ratio(this.kills, this.deaths)
    }
}
