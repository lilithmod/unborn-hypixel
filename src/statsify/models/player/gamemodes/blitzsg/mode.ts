/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { add, ratio } from '../../../../util/math.js'

export class BlitzSGMode {
    public wins: number

    public kills: number

    public constructor(data: APIData, mode: string) {
        mode = mode ? `_${mode}` : mode

        this.wins = data[`wins${mode || '_solo_normal'}`]
        this.kills = data[`kills${mode}`]
    }
}

export class BlitzSGOverall {
    public wins: number

    public kills: number

    public deaths: number

    public kdr: number

    public constructor(data: APIData) {
        this.wins = add(data.wins_solo_normal, data.wins_teams_normal)
        this.kills = data.kills
        this.deaths = data.deaths
        this.kdr = ratio(this.kills, this.deaths)
    }
}
