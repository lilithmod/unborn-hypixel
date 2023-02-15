/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { ratio } from '../../../../util/math.js'

export class SpeedUHCMastery {
    public wins: number

    public losses: number

    public wlr: number

    public kills: number

    public deaths: number

    public kdr: number

    public constructor(data: APIData, mastery: string) {
        mastery = `_mastery_${mastery}`

        this.wins = data[`wins${mastery}`]
        this.losses = data[`losses${mastery}`]
        this.kills = data[`kills${mastery}`]
        this.deaths = data[`deaths${mastery}`]

        this.wlr = ratio(this.wins, this.losses)
        this.kdr = ratio(this.kills, this.deaths)
    }
}
