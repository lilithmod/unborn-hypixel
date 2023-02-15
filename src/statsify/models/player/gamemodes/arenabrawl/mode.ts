/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { ratio } from '../../../../util/math.js'

export class ArenaBrawlMode {
    public wins: number

    public losses: number

    public wlr: number

    public kills: number

    public deaths: number

    public kdr: number

    public constructor(data: APIData, mode: string) {
        this.kills = data[`kills_${mode}`]
        this.deaths = data[`deaths_${mode}`]
        this.wins = data[`wins_${mode}`]
        this.losses = data[`losses_${mode}`]

        ArenaBrawlMode.applyRatios(this)
    }

    public static applyRatios(data: ArenaBrawlMode) {
        data.kdr = ratio(data.kills, data.deaths)
        data.wlr = ratio(data.wins, data.losses)
    }
}
