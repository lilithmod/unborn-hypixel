/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { ratio } from '../../../../util/math.js'

export class QuakeMode {
    public wins: number

    public kills: number

    public deaths: number

    public kdr: number

    public headshots: number

    public killstreaks: number

    public shotsFired: number

    public postUpdateKills: number

    public kwr: number

    public quakeShotAccuracy: number

    public constructor(data: APIData, mode: string) {
        mode = mode ? `_${mode}` : mode

        this.wins = data[`wins${mode}`]
        this.kills = data[`kills${mode}`]
        this.deaths = data[`deaths${mode}`]
        this.headshots = data[`headshots${mode}`]
        this.killstreaks = data[`killstreaks${mode}`]
        this.shotsFired = data[`shots_fired${mode}`]
        this.postUpdateKills = data[`kills_since_update_feb_2017${mode}`]
        QuakeMode.applyRatios(this)
    }

    public static applyRatios(data: QuakeMode) {
        data.kdr = ratio(data.kills, data.deaths)
        data.kwr = ratio(data.kills, data.wins)
        data.quakeShotAccuracy = ratio(data.postUpdateKills, data.shotsFired, 100)
    }
}
