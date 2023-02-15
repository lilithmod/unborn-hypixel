/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from '../../../../util/util.js'
import { add, ratio } from '../../../../util/math.js'

export class SkyWarsMode {
    public wins: number

    public losses: number

    public wlr: number

    public kills: number

    public deaths: number

    public kdr: number

    public gamesPlayed: number

    public assists: number

    public playtime: number

    //Kit gets applied in the main class
    public kit: string = 'default'

    public constructor(data: APIData, mode: string) {
        mode = mode ? `_${mode}` : mode

        this.wins = data[`wins${mode}`] ?? 0
        this.losses = data[`losses${mode}`] ?? 0
        this.kills = data[`kills${mode}`] ?? 0
        this.deaths = data[`deaths${mode}`] ?? 0
        this.gamesPlayed = add(this.wins, this.losses)
        this.assists = data[`assists${mode}`] ?? 0

        //Convert to milliseconds
        this.playtime = (data[`time_played${mode}`] ?? 0) * 1000

        SkyWarsMode.applyRatios(this)
    }

    public static applyRatios(data: SkyWarsMode) {
        data.kdr = ratio(data.kills, data.deaths)
        data.wlr = ratio(data.wins, data.losses)
    }
}
